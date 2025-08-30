interface StructuredDataProps {
  type: "video" | "ranking" | "breadcrumb"
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getSchema = () => {
    switch (type) {
      case "video":
        return {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: `${data.date} Takipçi Sıralaması`,
          description: `${data.date} tarihli video için takipçi sıralaması ve sonuçları`,
          uploadDate: data.date,
          thumbnailUrl:
            data.thumbnail ||
            "https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/526027825_17847098409534320_7497183794950261517_n%20(1).jpg",
          publisher: {
            "@type": "Organization",
            name: "takipcileridovusturuyorum",
            logo: {
              "@type": "ImageObject",
              url: "https://pub-63c4f2af186d48f184dea3dfce00ba35.r2.dev/526027825_17847098409534320_7497183794950261517_n%20(1).jpg",
            },
          },
        }

      case "ranking":
        return {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Takipçi Sıralaması",
          description: "Instagram takipçilerinin güncel sıralaması",
          numberOfItems: data.rankings?.length || 0,
          itemListElement:
            data.rankings?.slice(0, 10).map((user: any, index: number) => ({
              "@type": "ListItem",
              position: user.rank,
              name: user.username,
              url: `https://takipcileridovusturuyorum.vercel.app/siralama?search=${user.username}`,
            })) || [],
        }

      case "breadcrumb":
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement:
            data.items?.map((item: any, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: item.url,
            })) || [],
        }

      default:
        return {}
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchema()),
      }}
    />
  )
}
