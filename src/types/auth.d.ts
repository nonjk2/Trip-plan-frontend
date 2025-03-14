type SuccessCode<T> = {
  status: boolean;
  code: number;
  message: string;
  data: T;
};

type loginToKenData = {
  nickname: string;
  accessToken: string;
  refreshToken: string;
};

type Profile = {
  userId: number;
  nickname: string;
  email: string;
  image: string;
  userRole: string;
  point: number;
};
