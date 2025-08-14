export const categoriesGrouped = [
  {
    label: "Conteúdo & Marketing",
    options: [
      { value: "articles_and_blogs", label: "Artigos e Blogs" },
      { value: "social_media", label: "Redes Sociais" },
      { value: "seo", label: "SEO" },
      { value: "advertisements", label: "Anúncios" },
      { value: "marketing", label: "Marketing" }
    ]
  },
  {
    label: "Comunicação",
    options: [
      { value: "emails", label: "E-mails" },
      { value: "letter", label: "Cartas" },
      { value: "customer_service", label: "Atendimento ao Cliente" },
      { value: "press_release", label: "Comunicados de Imprensa" }
    ]
  },
  {
    label: "Criação de Conteúdo",
    options: [
      { value: "ebook", label: "E-books" },
      { value: "podcast", label: "Podcasts" },
      { value: "video_scripts", label: "Roteiros de Vídeo" },
      { value: "website_copy", label: "Textos para Site" }
    ]
  },
  {
    label: "Análise & Pesquisa", 
    options: [
      { value: "research", label: "Pesquisa" },
      { value: "reviews", label: "Avaliações de Produtos" },
      { value: "rewriter", label: "Reescrita de Conteúdo" }
    ]
  },
  {
    label: "E-commerce & Vendas",
    options: [
      { value: "ecommerce", label: "E-commerce" }
    ]
  },
  {
    label: "Outros",
    options: [
      { value: "other", label: "Outros" }
    ]
  }
];

export function getCategoryInfo(value) {
  const categoryIndex = {
    'articles_and_blogs': { group: 'Conteúdo & Marketing', label: 'Artigos e Blogs' },
    'social_media': { group: 'Conteúdo & Marketing', label: 'Redes Sociais' },
    'seo': { group: 'Conteúdo & Marketing', label: 'SEO' },
    'advertisements': { group: 'Conteúdo & Marketing', label: 'Anúncios' },
    'marketing': { group: 'Conteúdo & Marketing', label: 'Marketing' },
    'emails': { group: 'Comunicação', label: 'E-mails' },
    'letter': { group: 'Comunicação', label: 'Cartas' },
    'customer_service': { group: 'Comunicação', label: 'Atendimento ao Cliente' },
    'press_release': { group: 'Comunicação', label: 'Comunicados de Imprensa' },
    'ebook': { group: 'Criação de Conteúdo', label: 'E-books' },
    'podcast': { group: 'Criação de Conteúdo', label: 'Podcasts' },
    'video_scripts': { group: 'Criação de Conteúdo', label: 'Roteiros de Vídeo' },
    'website_copy': { group: 'Criação de Conteúdo', label: 'Textos para Site' },
    'research': { group: 'Análise & Pesquisa', label: 'Pesquisa' },
    'reviews': { group: 'Análise & Pesquisa', label: 'Avaliações de Produtos' },
    'rewriter': { group: 'Análise & Pesquisa', label: 'Reescrita de Conteúdo' },
    'ecommerce': { group: 'E-commerce & Vendas', label: 'E-commerce' },
    'other': { group: 'Outros', label: 'Outros' }
  };
  
  return value ? (categoryIndex[value] || { group: '-', label: value }) : { group: '-', label: '-' };
}