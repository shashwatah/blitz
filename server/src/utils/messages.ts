// INCOMING
export const MOVE = "move";         // {type: MOVE, move : {from, to}}
export const RESIGN = "resign";     // {type: RESIGN}

// OUTGOING
export const WAIT = "wait";         // {type: WAITING, code?}
export const INIT = "init";        // {type: INIT, data: {id, color}}
export const YOUMV = "you_moved"    // {type: YOUMV, move (chess)} 
export const OPPMV = "opp_moved"    // {type: OPPMV, move (chess)}
export const END = "end";           // {type: END, cause}
export const WARN = "warn";         // {type: WARN, cause}
export const ERROR = "error";       // {type: ERROR, cause}

// OUTGOING ERRORS
export const BADCODE = "bad_code";
export const BADJSON = "bad_json";
export const BADMSG = "bad_msg";

// OUTGOING WARNINGS
export const BADTURN = "bad_turn";  
export const BADMOVE = "bad_move";  

// OUTGOING GAME END CAUSES
export const YOURSG = "you_resigned";
export const OPPRSG= "opp_resigned";
export const OPPDSC = "opp_disconnected";