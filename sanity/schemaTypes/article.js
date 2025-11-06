export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Title'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title'}},
    {name: 'excerpt', type: 'text', title: 'Excerpt'},
    {name: 'content', type: 'array', title: 'Content', of: [{type: 'block'}]},
    {name: 'image', type: 'image', title: 'Cover Image'},
    {name: 'date', type: 'datetime', title: 'Published Date'},
  ],
}
