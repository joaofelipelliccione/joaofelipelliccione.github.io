export const mockUsersArr = [
  {
    id: 1,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  },
  {
    id: 1,
    username: 'Fake User',
    role: 'non-existent',
    email: 'fake_user.wrongFormat.com',
    password: 'lessT6', // Menos de 6 caracteres.
  },
];
