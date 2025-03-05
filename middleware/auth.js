import { getToken, isTokenExpired } from '../utils/authorization';

export default function ({ redirect }) {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    return redirect('/login');
  }
}
