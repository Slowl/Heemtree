export default {
  name: 'links',
  title: 'Links',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        layout: 'radio',
        direction: 'horizontal'
      }
    },    
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
  orderings: [
    {
      title: 'Order',
      name: 'order',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'order',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return Object.assign({}, selection, {
        title: `${subtitle} - ${title}`,
        subtitle: '',
      })
    },
  },
}
