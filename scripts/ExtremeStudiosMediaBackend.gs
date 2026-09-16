/**
 * Extreme Studios media backend
 *
 * Deploy this file as a Google Apps Script Web App. It stores uploaded images
 * in the Drive folder below and keeps their public metadata in the linked Sheet.
 */
const MEDIA_CONFIG = {
  spreadsheetId: '1AyQ5A32uQyHdX6tgqSMuBn1JjopSp-LSPeYiU9Cwxpk',
  driveFolderId: '1M3yLaRnYPjV8ZgKmLwfXG0fNmsz2Oz9o',
  sheetName: 'Media',
  secretProperty: 'MEDIA_UPLOAD_SECRET'
};

function doGet(event) {
  const action = String((event && event.parameter && event.parameter.action) || 'list');
  if (action !== 'list') return json_({ ok: false, error: 'Action tidak dikenal.' });

  const sheet = getMediaSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return json_({ ok: true, items: [] });

  const headers = values.shift();
  const index = Object.fromEntries(headers.map(function(header, position) {
    return [String(header), position];
  }));
  const items = values
    .filter(function(row) { return String(row[index.status] || 'published') === 'published'; })
    .map(function(row) {
      return {
        id: String(row[index.id] || ''),
        createdAt: String(row[index.createdAt] || ''),
        title: String(row[index.title] || ''),
        alt: String(row[index.alt] || ''),
        category: String(row[index.category] || 'Portfolio'),
        url: String(row[index.url] || '')
      };
    })
    .filter(function(item) { return item.url; })
    .reverse();

  return json_({ ok: true, items: items });
}

function doPost(event) {
  try {
    const payload = JSON.parse((event && event.postData && event.postData.contents) || '{}');
    const expectedSecret = PropertiesService.getScriptProperties().getProperty(MEDIA_CONFIG.secretProperty);
    if (!expectedSecret || payload.secret !== expectedSecret) {
      return json_({ ok: false, error: 'Akses upload tidak valid.' });
    }

    const dataUrl = String(payload.dataUrl || '');
    const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
    if (!match) return json_({ ok: false, error: 'File harus berupa gambar JPG, PNG, atau WebP.' });

    const mimeType = match[1];
    const bytes = Utilities.base64Decode(match[2]);
    if (bytes.length > 3.5 * 1024 * 1024) {
      return json_({ ok: false, error: 'Ukuran gambar maksimal 3,5 MB.' });
    }

    const filename = safeFileName_(payload.filename, mimeType);
    const file = DriveApp.getFolderById(MEDIA_CONFIG.driveFolderId)
      .createFile(Utilities.newBlob(bytes, mimeType, filename));
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    const row = [
      Utilities.getUuid(),
      new Date().toISOString(),
      filename,
      cleanText_(payload.title, 100) || filename,
      cleanText_(payload.alt, 180),
      cleanText_(payload.category, 50) || 'Portfolio',
      mimeType,
      bytes.length,
      file.getId(),
      'https://drive.google.com/uc?export=view&id=' + file.getId(),
      'published'
    ];
    getMediaSheet_().appendRow(row);

    return json_({ ok: true, item: { id: row[0], title: row[3], alt: row[4], category: row[5], url: row[9] } });
  } catch (error) {
    return json_({ ok: false, error: error.message || 'Upload gagal.' });
  }
}

function setupMediaStorage() {
  getMediaSheet_();
  DriveApp.getFolderById(MEDIA_CONFIG.driveFolderId);
}

function getMediaSheet_() {
  const spreadsheet = SpreadsheetApp.openById(MEDIA_CONFIG.spreadsheetId);
  let sheet = spreadsheet.getSheetByName(MEDIA_CONFIG.sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(MEDIA_CONFIG.sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['id', 'createdAt', 'fileName', 'title', 'alt', 'category', 'mimeType', 'sizeBytes', 'driveFileId', 'url', 'status']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function safeFileName_(value, mimeType) {
  const extension = mimeType === 'image/png' ? 'png' : mimeType === 'image/webp' ? 'webp' : 'jpg';
  const base = cleanText_(value, 80).replace(/\.[A-Za-z0-9]+$/, '').replace(/[^a-zA-Z0-9._-]+/g, '-');
  return (base || 'extreme-studios-image') + '.' + extension;
}

function cleanText_(value, maxLength) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength);
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
