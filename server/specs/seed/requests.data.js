export default {
  validData1: {
    fullName: 'Pascal',
    email: 'slimtrader@gmail.com',
    location: 'Lagos',
    deatils: 'Requests Details must be between 20 to 1000 characters'
  },
  validData2: {
    fullName: 'Pascal',
    email: 'gtb@gmail.com',
    location: 'Lagos',
    address: '123 V.I Lagos',
    businessImage: 'business picture',
    deatils: 'Requests Details must be between 20 to 1000 characters'
  },

  emptyData: {
    fullName: '',
    email: '',
    category: '',
    address: '',
    location: '',
    businessImage: '',
    aboutUs: ''
  },
  invalidData: {
    fullName: '12gtbank',
    email: 'gtb@gmail',
    location: 'Lagos',
    details: ''
  },
  incompleteData: {
    fullName: 'a',
    email: 'gtb@gmail',
    location: 'Lagos',
    details: 'less than 20'
  }
};
