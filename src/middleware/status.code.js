class HttpStatus {
  ok = (data, message) => {
    return {data : data, stauts : 200, message: message };
  };

  created = (data, message) => {
    return {data, stauts : 201, message: message}
  };

  badRequest = (message) => {
    return {status : 400, message: message}
  }

  unauthorized = () => {
    return {stauts : 401, message: '로그인이 필요합니다.'}
  }

  Forbidden = () => {
    return {stauts : 403, message: '권한이 없습니다.'}
  }
  
  Found = () => {
    return {stauts : 404, message: '요청받은 리소스를 찾을 수 없습니다.'}
  }
}

module.exports = HttpStatus;