export default {
  validInput1: {
    firstName: 'Bruce',
    lastName: 'Banner',
    email: 'banner@yahoo.com',
    password: 'bruce banner',
  },
  validInput2: {
    firstName: 'Mike',
    lastName: 'Owen',
    email: 'mk@yahoo.com',
    password: 'ulor mike',
  },

  existingEmail: {
    firstName: 'Barry',
    lastName: 'Allen',
    email: 'banner@yahoo.com',
    password: 'theFlash',
  },
  incompleteData: {
    firstName: 'Anna',
    lastName: 'Jones',
    email: 'annie@yahoo.com',
  },
  emptyData: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  improperData: {
    firstName: '23BruceBanner',
    lastName: '1Jones',
    email: 'banner@yahoo.com',
    password: 'bruce banner',
  },
  userOneLogin: { email: 'banner@yahoo.com', password: 'bruce banner' },
  userTwoLogin: { email: 'mk@yahoo.com', password: 'ulor mike' },
  emptyLoginData: { email: '', password: '' },
  noEmail: { email: '', password: 'bruce banner' },
  noPassword: { email: 'mk@yahoo.com', password: '' },
  invalidEmail: { email: 'wrongEmail', password: 'bruce banner' },
  invalidPassword: { email: 'Bruce Banner', password: 'wrongPassword' },
  invalidEmailPassword: { email: 'wrongEmail', password: 'wrongPassword' },
};
