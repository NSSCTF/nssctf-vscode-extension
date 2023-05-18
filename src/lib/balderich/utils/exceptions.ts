import {
    AUTH_CALC_ERROR,
    AUTH_ERROR_SIGN,
    AUTH_NONE,
    AUTH_NOT_EXIST,
    AUTH_REQUEST_FAST,
    AUTH_TIMEOUT,
    CONTEST_NOT_EXIST,
    CONTEST_PERMISSION_DENIED,
    PROBLEM_NOT_EXIST,
    PROBLEM_PERMISSION_DENIED,
    PROBLEM_SHEET_NOT_EXIST,
    PROBLEM_SHEET_PERMISSION_DENIED,
    REQUEST_PARAM_INVALID,
    TEAM_CONTEST_NOT_EXIST,
    TEAM_CONTEST_PERMISSION_DENIED,
    TEAM_METHOD_PERMISSION_DENIED,
    TEAM_NOT_EXIST,
    TEAM_NO_MEMBER,
    TEAM_PERMISSION_DENIED,
    TEAM_PROBLEM_NOT_EXIST,
    TEAM_PROBLEM_PERMISSION_DENIED,
    USER_CLOSE_FOLLOW,
    USER_IMAGE_FORMAT_ERROR,
    USER_IMAGE_NONE,
    USER_IMAGE_NOT_EXIST,
    USER_IMAGE_OPEN_ERROR,
    USER_MEMORY_NOT_ENOUGH,
    USER_NOT_EXIST,
} from './code'

class AuthNoneException extends Error {}
class AuthNotExistException extends Error {}
class AuthErrorSignException extends Error {}
class AuthTimeoutException extends Error {}
class AuthCalcErrorException extends Error {}
class AuthRequestFastException extends Error {}
class RequestParamInvalidException extends Error {}

class UserNotExistException extends Error {}
class UserCloseFollowException extends Error {}
class UserImageNoneException extends Error {}
class UserImageFormatErrorException extends Error {}
class UserImageOpenErrorException extends Error {}
class UserMemoryNotEnoughException extends Error {}
class UserImageNotExistException extends Error {}

class ProblemNotExistException extends Error {}
class ProblemPermissionDeniedException extends Error {}
class ProblemSheetNotExistException extends Error {}
class ProblemSheetPermissionDeniedException extends Error {}

class ContestNotExistException extends Error {}
class ContestPermissionDeniedException extends Error {}

class TeamNotExistException extends Error {}
class TeamPermissionDeniedException extends Error {}
class TeamNoMemberException extends Error {}
class TeamMethodPermissionDeniedException extends Error {}
class TeamProblemNotExistException extends Error {}
class TeamProblemPermissionDeniedException extends Error {}
class TeamContestNotExistException extends Error {}
class TeamContestPermissionDeniedException extends Error {}

export const getException = (code: number, msg: string = '') => {
    if (code === AUTH_NONE) {
        return new AuthNoneException(msg)
    } else if (code === AUTH_NOT_EXIST) {
        return new AuthNotExistException(msg)
    } else if (code === AUTH_ERROR_SIGN) {
        return new AuthErrorSignException(msg)
    } else if (code === AUTH_TIMEOUT) {
        return new AuthTimeoutException(msg)
    } else if (code === AUTH_CALC_ERROR) {
        return new AuthCalcErrorException(msg)
    } else if (code === AUTH_REQUEST_FAST) {
        return new AuthRequestFastException(msg)
    } else if (code === REQUEST_PARAM_INVALID) {
        return new RequestParamInvalidException(msg)
    } else if (code === USER_NOT_EXIST) {
        return new UserNotExistException(msg)
    } else if (code === USER_CLOSE_FOLLOW) {
        return new UserCloseFollowException(msg)
    } else if (code === USER_IMAGE_NONE) {
        return new UserImageNoneException(msg)
    } else if (code === USER_IMAGE_FORMAT_ERROR) {
        return new UserImageFormatErrorException(msg)
    } else if (code === USER_IMAGE_OPEN_ERROR) {
        return new UserImageOpenErrorException(msg)
    } else if (code === USER_MEMORY_NOT_ENOUGH) {
        return new UserMemoryNotEnoughException(msg)
    } else if (code === USER_IMAGE_NOT_EXIST) {
        return new UserImageNotExistException(msg)
    } else if (code === PROBLEM_NOT_EXIST) {
        return new ProblemNotExistException(msg)
    } else if (code === PROBLEM_PERMISSION_DENIED) {
        return new ProblemPermissionDeniedException(msg)
    } else if (code === PROBLEM_SHEET_NOT_EXIST) {
        return new ProblemSheetNotExistException(msg)
    } else if (code === PROBLEM_SHEET_PERMISSION_DENIED) {
        return new ProblemSheetPermissionDeniedException(msg)
    } else if (code === CONTEST_NOT_EXIST) {
        return new ContestNotExistException(msg)
    } else if (code === CONTEST_PERMISSION_DENIED) {
        return new ContestPermissionDeniedException(msg)
    } else if (code === TEAM_NOT_EXIST) {
        return new TeamNotExistException(msg)
    } else if (code === TEAM_PERMISSION_DENIED) {
        return new TeamPermissionDeniedException(msg)
    } else if (code === TEAM_NO_MEMBER) {
        return new TeamNoMemberException(msg)
    } else if (code === TEAM_METHOD_PERMISSION_DENIED) {
        return new TeamMethodPermissionDeniedException(msg)
    } else if (code === TEAM_PROBLEM_NOT_EXIST) {
        return new TeamProblemNotExistException(msg)
    } else if (code === TEAM_PROBLEM_PERMISSION_DENIED) {
        return new TeamProblemPermissionDeniedException(msg)
    } else if (code === TEAM_CONTEST_NOT_EXIST) {
        return new TeamContestNotExistException(msg)
    } else if (code === TEAM_CONTEST_PERMISSION_DENIED) {
        return new TeamContestPermissionDeniedException(msg)
    }
}
