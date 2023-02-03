"use strict";
// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
module.exports = (req, res, next) => {
  /** @type {number} */
  const role = res.locals.users;
  if (role === 1) {
    next();
  } else {
    return res.status(403).json({
      errorMessage: '운영자만 사용가능합니다.'
    })
  }
};
