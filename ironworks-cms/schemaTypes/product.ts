import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'პროდუქცია',
  type: 'document',
  fields: [
    // ეს ველი დამალულია კლიენტისთვის, რადგან ჩვენ მას ავტომატურად ვგენერირებთ კოდში
    defineField({
      name: 'title',
      title: 'დასახელება (ავტომატური)',
      type: 'string',
      initialValue: 'დროებითი სახელი', 
      hidden: true, 
    }),
    // კატეგორიების ჩამონათვალი
    defineField({
      name: 'category',
      title: 'კატეგორია',
      type: 'string',
      options: {
        list: [
          { title: 'კარი', value: 'კარი' },
          { title: 'ჭიშკარი', value: 'ჭიშკარი' },
          { title: 'აივნის მოაჯირი', value: 'აივნის მოაჯირი' },
          { title: 'კიბის მოაჯირი', value: 'კიბის მოაჯირი' },
          { title: 'კიბე', value: 'კიბე' },
          { title: 'მაყალი', value: 'მაყალი' },
          { title: 'გისოსი', value: 'გისოსი' }
        ]
      },
      validation: (Rule) => Rule.required().error('კატეგორიის არჩევა აუცილებელია')
    }),
    // ფოტოს ველი
    defineField({
      name: 'image',
      title: 'ფოტო',
      type: 'image',
      options: {
        hotspot: true // საშუალებას აძლევს კლიენტს, აირჩიოს ფოტოს ფოკუსი
      },
      validation: (Rule) => Rule.required().error('ფოტო აუცილებელია')
    })
  ],
  // ეს არის ის, რასაც შენ დაინახავ Sanity Studio-ს სიაში
  preview: {
    select: {
      title: 'category', // სიაში აჩვენებს კატეგორიას
      media: 'image'
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.media
      }
    }
  }
});