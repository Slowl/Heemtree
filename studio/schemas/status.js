export default {
  name: 'status',
  title: 'Status',
  type: 'document',
  fields: [
    {
      name: 'message',
      title: 'Message',
      type: 'string',
    },
    {
      name: 'imageStatus',
      title: 'Image Status',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    // {
    //   name: 'bio',
    //   title: 'Bio',
    //   type: 'array',
    //   of: [
    //     {
    //       title: 'Block',
    //       type: 'block',
    //       styles: [{title: 'Normal', value: 'normal'}],
    //       lists: [],
    //     },
    //   ],
    // },
  ],
  preview: {
    select: {
      title: 'message',
      media: 'imageStatus',
    },
  },
}
