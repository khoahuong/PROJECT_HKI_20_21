export class ParseToken {
  iss: string;
  sub: string;
  aud: string[] | string;
  exp: number;
  nbf: number;
  iat: number;
  jti: string;
  authorities: string[];
}
