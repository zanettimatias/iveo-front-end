export default function authHeader(user) {
  if (user && user.accessToken) {
    return 'Bearer ' + user.accessToken  // for Spring Boot back-end
  } else {
    return {}
  }
}
