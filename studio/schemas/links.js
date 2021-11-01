export default {
  name: 'links',
  title: 'Links',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
    },
    {
      name: 'isAnimated',
      title: 'Animate',
      type: 'boolean',
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
