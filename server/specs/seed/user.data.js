export default {
  validInput1: {
    fullName: 'Bruce Banner',
    email: 'banner@yahoo.com',
    password: 'bruce banner'
  },
  validInput2: {
    fullName: 'Mike',
    email: 'mk@yahoo.com',
    password: 'ulor mike'
  },

  existingEmail: {
    fullName: 'BruceBanner',
    email: 'banner@yahoo.com',
    password: 'bruce banner'
  },
  incompleteData: {
    fullName: 'Anna Jones',
    email: 'annie@yahoo.com'
  },
  emptyData: {
    fullName: '',
    email: '',
    password: ''
  },
  improperData: {
    fullName: '23BruceBanner',
    email: 'banner@yahoo.com',
    password: 'bruce banner'
  },
  userOneLogin: { email: 'banner@yahoo.com', password: 'bruce banner' },
  userTwoLogin: { email: 'mk@yahoo.com', password: 'ulor mike' },
  emptyLoginData: { email: '', password: '' },
  noEmail: { email: '', password: 'bruce banner' },
  noPassword: { email: 'mk@yahoo.com', password: '' },
  invalidEmail: { email: 'wrongEmail', password: 'bruce banner' },
  invalidPassword: { email: 'Bruce Banner', password: 'wrongPassword' },
  invalidEmailPassword: { email: 'wrongEmail', password: 'wrongPassword' }
};
