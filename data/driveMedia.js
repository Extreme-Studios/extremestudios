const driveMediaMap = {
  "/umkm-naik-kelas-workshop.png": "https://drive.google.com/uc?export=view&id=1MdZwdLoOaLFHOugf3aSw5pHWmjONa6xk",
  "/diana-cs-avatar.png": "https://drive.google.com/uc?export=view&id=19OzRTDTWtGnfKg0m5tE-Nqb_zTc7dE2y",
  "/generated-ai-core.png": "https://drive.google.com/uc?export=view&id=1Amwi7AwcGPTnRT4YlcYnZN-jnEHtUUVp",
  "/generated-diana-ai.png": "https://drive.google.com/uc?export=view&id=1bdGRLdnkVEfXd33AhsQJ1ltTL6z4-IbX",
  "/featured/guitar-fx.png": "https://drive.google.com/uc?export=view&id=1jYwJkIgZ0bAEj8ZxcAs_HSzyrPDzugCz",
  "/featured/movie-hub.png": "https://drive.google.com/uc?export=view&id=1cGkh8b8oxq_m0xlBll5s1vLDyttKszDq",
  "/project-parfi-jatim/parfi-home.png": "https://drive.google.com/uc?export=view&id=1lNrFenn_qaAT-c9gWz_UrdUDAJnmn5mq",
  "/project-parfi-jatim/parfi-news.png": "https://drive.google.com/uc?export=view&id=11CW3udWXwCmVOFMyIuCm8cA-y15vyChU",
  "/project-parfi-jatim/parfi-agenda.png": "https://drive.google.com/uc?export=view&id=1QwusivZUnJADzsNASEk7Xt_FgA9by5fD",
  "/project-parfi-jatim/parfi-film-gallery.png": "https://drive.google.com/uc?export=view&id=1vyzvKNYAKO8ocf_ewbq-inp2TYgUEWg1",
  "/project-mockups/web-platform.png": "https://drive.google.com/uc?export=view&id=1nP97CPy1vNYc-RH0nlAOEy68Reuc4_49",
  "/project-mockups/streaming-platform.png": "https://drive.google.com/uc?export=view&id=1RGA12Nq83KLz_OAxXtFykq8rE8_3qhzg",
  "/project-mockups/creative-tools.png": "https://drive.google.com/uc?export=view&id=1BZFeriQweb18KG08XYK0UUq-WNB0mQvB",
  "/project-mockups/ai-engineering.png": "https://drive.google.com/uc?export=view&id=1sWTUIJyteXpkTwQAFdq4JmhcO84oyFkj",
  "/mockups/portal-arek-musik.png": "https://drive.google.com/uc?export=view&id=1PICBO2Uji29re-Gh6ALCI0c2YKdXYK7j",
  "/mockups/photography-invoice.png": "https://drive.google.com/uc?export=view&id=1Qlv5Y7BQ_w5DynZv6vGiKGxl_rM9LJp6",
  "/mockups/pasarku-sidokerto.png": "https://drive.google.com/uc?export=view&id=1IVAIE8SlvJ5MxB8Xql--Tatw8Az14tou",
  "/mockups/pas-photo-layout.png": "https://drive.google.com/uc?export=view&id=1a_Aop-ZwwsghdcPjL5um1pmKe9o_mA0m",
  "/mockups/lazis-nu-sidokerto-tv.png": "https://drive.google.com/uc?export=view&id=15YGGGYexR8uF351wBf6sPpHo9BAeTxC_",
  "/mockups/grii-sidoarjo.png": "https://drive.google.com/uc?export=view&id=1n7n3qae1BWeQ6f8vkVus4MT-iR0vhxRi",
  "/mockups/extreme-studios-hub.png": "https://drive.google.com/uc?export=view&id=16kKdpFUBsL8g1JO0D0UBXkar8mjntQVF",
  "/mockups/cinema-parfi-jatim.png": "https://drive.google.com/uc?export=view&id=1por1QIw8C6leb4gjxbK5DeZhExvrIWth",
  "/mockups/cine-arena.png": "https://drive.google.com/uc?export=view&id=1jQ6AliXcCROW0DWeih3WV_HJppHE5QZm",
  "/mockups/auto-cut-video.png": "https://drive.google.com/uc?export=view&id=176HRH0_Z_T0Y00InogA2RM13vYiPk3wF",
  "/demo-mua/wedding-decor.png": "https://drive.google.com/uc?export=view&id=1u1DPcL0qpUA1Q5tMNIaFilXEOGxVKntb",
  "/demo-mua/makeup-session.png": "https://drive.google.com/uc?export=view&id=1DN6L1xe2s52e9-wjMIzYyWWprgvn8Xlo",
  "/demo-mua/bridal-fashion.png": "https://drive.google.com/uc?export=view&id=1NOBgNi0JPK_8ylyWMZ_1S1WU04at1WfW"
};

export function driveMedia(path) {
  const url = driveMediaMap[path];
  if (!url) return path;

  const fileId = url.split("id=")[1];
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}
