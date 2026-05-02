type FormData<Data> = {
  isValid: boolean;
  data: Data;
};

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

type LoginFormData = {
  email: string;
  password: string;
};

type PostFormData = {
  postContent: string;
};

const registerForm: FormData<RegisterFormData> = {
  isValid: true,
  data: {
    name: "ProCodrr",
    email: "procodrr@gmail.com",
    password: "abcd",
  },
};

const loginForm: FormData<LoginFormData> = {
  isValid: false,
  data: {
    email: "procodrr@gmail.com",
    password: "abcd",
  },
};

const createPostForm: FormData<PostFormData> = {
  isValid: true,
  data: {
    postContent: "procodrr@gmail.com",
  },
};

export {};
