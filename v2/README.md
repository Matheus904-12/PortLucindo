# Versão 2 - Portfolio Moderno

## 🎨 Design Inspirado em BASIKARA

Esta é uma versão moderna e elegante do portfólio, inspirada no design minimalista do BASIKARA.

## ✨ Características

- **Design Minimalista**: Layout clean com foco em tipografia e espaçamento
- **Animações Suaves**: Transições e efeitos que criam uma experiência fluida
- **Cursor Customizado**: Cursor interativo que responde aos elementos da página
- **Totalmente Responsivo**: Funciona perfeitamente em todos os dispositivos
- **Sistema Dinâmico**: Conteúdo carregado de arquivo JSON para fácil atualização
- **Performance Otimizada**: Carregamento rápido e animações de alta performance

## 🎨 Paleta de Cores

- **Primary (Preto)**: `#000000` - Texto e elementos principais
- **Secondary (Branco)**: `#FFFFFF` - Fundo e elementos secundários
- **Accent (Amarelo)**: `#FFE500` - Destaques e CTAs
- **Text Gray**: `#666666` - Texto secundário

## 🚀 Como Usar

1. **Visualizar**: Abra o arquivo `index.html` no navegador
2. **Personalizar**: Edite o arquivo `data/portfolio-data.json` com suas informações
3. **Deploy**: Faça upload dos arquivos para seu servidor

## 📝 Estrutura de Arquivos

```
v2/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   └── style.css         # Estilos principais
│   ├── js/
│   │   └── main.js           # JavaScript principal
│   └── images/               # Suas imagens
└── data/
    └── portfolio-data.json   # Dados do portfólio
```

## 🔧 Personalizando Seus Dados

### Editar Informações Pessoais

Abra `data/portfolio-data.json` e atualize a seção `personal`:

```json
{
  "personal": {
    "name": "Seu Nome",
    "title": "Seu Título",
    "email": "seu@email.com",
    "phone": "+55 11 99999-9999",
    "bio": "Sua biografia...",
    "social": {
      "linkedin": "https://linkedin.com/in/seu-perfil",
      "github": "https://github.com/seu-usuario"
    }
  }
}
```

### Adicionar Projetos

Na seção `projects` do JSON:

```json
{
  "id": 1,
  "title": "Nome do Projeto",
  "category": "Categoria",
  "description": "Descrição do projeto",
  "image": "URL da imagem",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "link": "https://projeto.com",
  "github": "https://github.com/user/repo"
}
```

### Adicionar Expertise

Na seção `expertise` do JSON:

```json
{
  "icon": "fas fa-code",
  "title": "Título da Habilidade",
  "description": "Descrição da habilidade",
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
```

### Adicionar Depoimentos

Na seção `testimonials` do JSON:

```json
{
  "company": "Nome da Empresa",
  "logo": "🏢",
  "role": "Cargo - Nome",
  "text": "Depoimento completo aqui...",
  "rating": 5
}
```

## 📱 Seções do Portfólio

1. **Hero**: Apresentação principal com foto e estatísticas
2. **About**: Biografia detalhada e highlights
3. **Expertise**: Suas habilidades e áreas de atuação
4. **Projects**: Portfólio de projetos com filtros
5. **Testimonials**: Depoimentos de clientes
6. **FAQ**: Perguntas frequentes
7. **Contact**: Formulário de contato e informações

## 🎯 Recursos Interativos

- **Scroll Animations**: Elementos animam ao aparecer na tela
- **Counter Animation**: Números das estatísticas animam ao scroll
- **Hover Effects**: Efeitos suaves nos cards e botões
- **Accordion FAQ**: Perguntas expansíveis
- **Slider de Testimonials**: Navegação entre depoimentos
- **Formulário de Contato**: Sistema de envio de mensagens

## 🌐 Navegação

A navegação é fixa no topo e muda de estilo ao fazer scroll:
- Links animados com sublinhado
- Indicador de seção ativa
- Menu mobile responsivo (hamburger)
- Smooth scroll entre seções

## 📸 Imagens Recomendadas

- **Profile Image**: 800x1000px (aspect ratio 3:4)
- **Project Images**: 1600x1000px (aspect ratio 16:10)
- **Format**: JPG ou WebP para melhor performance
- **Compression**: Otimizar para web (< 200KB por imagem)

## 🔤 Fontes Utilizadas

- **Space Grotesk**: Títulos e elementos de destaque
- **Inter**: Texto corpo e navegação

## ⚡ Performance

- Lazy loading de imagens
- CSS otimizado e minificado
- JavaScript modular
- Sem dependências pesadas (apenas Font Awesome para ícones)

## 🐛 Troubleshooting

### Dados não aparecem?
- Verifique se o arquivo `portfolio-data.json` está correto
- Abra o Console do navegador (F12) para ver erros
- Certifique-se que o caminho para o JSON está correto

### Imagens não carregam?
- Verifique os caminhos das imagens no JSON
- Use URLs absolutas ou caminhos relativos corretos

### Animações não funcionam?
- Teste em um navegador moderno (Chrome, Firefox, Safari)
- Verifique se JavaScript está habilitado

## 🚀 Deploy

### GitHub Pages
1. Faça commit de todos os arquivos
2. Vá em Settings > Pages
3. Selecione a branch main e pasta `/v2`
4. Clique em Save

### Netlify
1. Arraste a pasta `v2` para Netlify Drop
2. Ou conecte seu repositório GitHub

### Vercel
1. Importe o repositório
2. Configure o diretório root como `v2`
3. Deploy!

## 📚 Tecnologias

- HTML5 Semântico
- CSS3 (Grid, Flexbox, Animations)
- JavaScript Vanilla (ES6+)
- Font Awesome Icons
- Google Fonts

## 💡 Dicas de Customização

1. **Cores**: Altere as variáveis CSS em `:root` no `style.css`
2. **Fontes**: Troque os links do Google Fonts no `index.html`
3. **Animações**: Ajuste as keyframes no `style.css`
4. **Layout**: Modifique os grid-template-columns para alterar layouts

## 📄 Licença

Este template é de uso livre. Personalize e use como quiser!

## 🤝 Suporte

Para dúvidas ou sugestões:
- Abra uma issue no GitHub
- Entre em contato através do formulário do portfólio

---

**Desenvolvido com ❤️ por Matheus Lucindo**

*Design inspirado em BASIKARA - Adaptado para portfólio profissional*
