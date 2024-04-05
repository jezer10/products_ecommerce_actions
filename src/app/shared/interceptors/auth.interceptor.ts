import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const username = 'jezer10';
  const password = 'Jafetito1*';
  const headers = req.headers.append(
    'Authorization',
    `Basic ${btoa(`${username}:${password}`)}`
  );
  return next(req);
};
