"use strict";
// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * 
 * @param {(req: Request, res: Response, next: NextFunction) => Promise<void>} fn
 */
function wrapAsync(fn) {
  return function (req, res, next) {
    // 모든 오류를 .catch() 처리하고 체인의 next() 미들웨어에 전달
    // (이 경우에는 오류 처리기)
    fn(req, res, next).catch(next);
  };
}