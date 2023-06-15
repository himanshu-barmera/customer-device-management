export const environment = {
  production: true,
  baseURL: "https://crm.bacancy.com/api/v1/",
  ckeConfig: {
    toolbar: [
      'undo', 'redo', '|',
      'heading', 'bold', 'italic', 'link', '|',
      'bulletedList', 'numberedList', 'indent', 'outdent', 'blockQuote'],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
      ]
    }
  },
};
