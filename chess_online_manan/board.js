var boardBack = document.getElementById("board");
var isMycolorWhite = true;
var myTurn = true;
var selectedPiece = -1;
var coloredButt = [];
var killable = [];
var pieceLocArr = [
  00,
  01,
  02,
  03,
  04,
  05,
  06,
  07,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
  77,
];

function makeBoard() {
  console.log("making Board...");
  boardBack.style.width = "400px";
  boardBack.style.height = "400px";
  boardBack.style.align = "left";
  boardBack.style.display = "flex";
  boardBack.style.flexWrap = "wrap";
  let temp = true;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      var bgbut = document.createElement("button");
      bgbut.setAttribute("id", "bgbutr" + i + "c" + j);
      bgbut.style.width = "48px";
      bgbut.style.height = "48px";
      bgbut.style.border = "none";
      bgbut.setAttribute("onclick", "clickedBgBut(this)");

      if (temp) {
        bgbut.style.opacity = "40%";
        bgbut.style.backgroundColor = "#666666";
      }
      temp = !temp;
      boardBack.appendChild(bgbut);
    }
    temp = !temp;
  }
  console.log("made the board");
  makePieces();
}

function makePieces() {
  console.log("making pieces");
  i = 0;

  //making black pieces
  while (i < 3) {
    newPiece = document.createElement("button");

    newPiece.style =
      "width : 48px;  height : 48px; position : absolute; zIndex : 1; border : none;";
    newPiece.style.background = "url(images/piece" + i + ".svg)";
    newPiece.setAttribute("id", "piece" + i);
    newPiece.setAttribute("onclick", "clickedPiece(this)");
    boardBack.appendChild(newPiece);

    copiedPiece = newPiece.cloneNode(true);
    copiedPiece.setAttribute("id", "piece" + (7 - i));
    boardBack.appendChild(copiedPiece);

    i++;
  }

  while (i < 5) {
    newPiece = document.createElement("button");

    newPiece.style =
      "width : 48px;  height : 48px; position : absolute; zIndex : 1; border : none;";
    newPiece.style.background = "url(images/piece" + i + ".svg)";
    newPiece.setAttribute("id", "piece" + i);
    newPiece.setAttribute("onclick", "clickedPiece(this)");
    boardBack.appendChild(newPiece);
    i++;
  }
  i = 8;
  while (i < 16) {
    newPiece = document.createElement("button");
    newPiece.setAttribute("id", "piece" + i);
    newPiece.style =
      "width : 48px;  height : 48px; position : absolute; zIndex : 1; border : none;";
    newPiece.style.background = "url(images/bp.svg)";
    newPiece.setAttribute("onclick", "clickedPiece(this)");

    i++;
    boardBack.appendChild(newPiece);
  }

  // making white pieces now

  while (i < 24) {
    newPiece = document.createElement("button");
    newPiece.setAttribute("id", "piece" + i);
    newPiece.style =
      "width : 48px;  height : 48px; position : absolute; zIndex : 1; border : none;";
    newPiece.style.background = "url(images/wp.svg)";
    newPiece.setAttribute("onclick", "clickedPiece(this)");

    i++;
    boardBack.appendChild(newPiece);
  }
  while (i < 27) {
    newPiece = document.createElement("button");

    newPiece.style =
      "width : 48px;  height : 48px; position : absolute; zIndex : 1; border : none;";
    newPiece.style.background = "url(images/piece" + i + ".svg)";
    newPiece.setAttribute("id", "piece" + i);
    newPiece.setAttribute("onclick", "clickedPiece(this)");
    boardBack.appendChild(newPiece);

    copiedPiece = newPiece.cloneNode(true);
    copiedPiece.setAttribute("id", "piece" + (55 - i));
    boardBack.appendChild(copiedPiece);

    i++;
  }

  while (i < 29) {
    newPiece = document.createElement("button");

    newPiece.style =
      "width : 48px;  height : 48px; position : absolute; zIndex : 1; border : none;";
    newPiece.style.background = "url(images/piece" + i + ".svg)";
    newPiece.setAttribute("id", "piece" + i);
    newPiece.setAttribute("onclick", "clickedPiece(this)");
    boardBack.appendChild(newPiece);
    i++;
  }
  console.log("made pieces");
  putPieces();
}

function clickedBgBut(ele) {
  if (myTurn) {
    var butId = ele.id.charAt(6) + ele.id.charAt(8);
    console.log("clicked on ", butId);

    if (checkColoredLoc(butId)) {
      pieceLocArr[selectedPiece] = butId;
      putPieces();
      removeButColor();
    }
  }
}
function checkColoredLoc(butId) {
  for (i = 0; i < coloredButt.length; i++) {
    if (butId == coloredButt[i]) return true;
  }
  return false;
}

function checkKillablePiece(pieceId) {
  console.log("checking piece", pieceId);
  for (i = 0; i < killable.length; i++) {
    if (pieceId == killable[i]) return true;
  }
  return false;
}

function clickedPiece(ele) {
  if (myTurn) {
    var pieceId = parseInt(("" + ele.id).substring(5));
    console.log("clicked piece number", pieceId);

    if (checkKillablePiece(pieceId)) {
      //this piece needs to be killed
      console.log("killing", pieceId);
      pieceLocArr[selectedPiece] = parseInt(pieceLocArr[pieceId]);
      pieceLocArr[pieceId] = 99; //change this later to place killed pieces
      putPieces();
    }

    removeButColor();

    //to move my piece
    if (pieceId < 16) {
      //black piece
      if (!isMycolorWhite) {
        selectedPiece = pieceId;
        if (pieceId > 7) {
          //black pawn

          downLoc = parseInt(pieceLocArr[pieceId]) + 10;
          leftDownLoc = downLoc - 1;
          pieceOnDownLeft = checkEmptyLoc(leftDownLoc);
          rightDownLoc = downLoc + 1;
          pieceOnDownRight = checkEmptyLoc(rightDownLoc);

          //check if it can move up

          if (checkEmptyLoc(downLoc) == -1 && downLoc <= 77) {
            coloredButt.push(downLoc);
          }
          if (pieceOnDownLeft != -1) {
            if (pieceOnDownLeft >= 16) {
              coloredButt.push(leftDownLoc);
              killable.push(pieceOnDownLeft);
            }
          }
          if (pieceOnDownRight != -1) {
            if (pieceOnDownRight >= 16) {
              coloredButt.push(rightDownLoc);
              killable.push(pieceOnDownRight);
            }
          }
        } else if (pieceId == 0 || pieceId == 7) {
          //black rook
          //down moving start
          down = parseInt(pieceLocArr[pieceId]) + 10;
          pieceOnDown = checkEmptyLoc(down);

          if (pieceOnDown > 15) {
            // Killable
            coloredButt.push(down);
            killable.push(pieceOnDown);
          }

          while (down <= 77 && pieceOnDown == -1) {
            coloredButt.push(down);
            down = down + 10;
            pieceOnDown = checkEmptyLoc(down);
            if (pieceOnDown > 15) {
              // Killable
              coloredButt.push(down);
              killable.push(pieceOnDown);
            }
          }
          // down moving finished
          //up moving start
          up = parseInt(pieceLocArr[pieceId]) - 10;
          pieceOnUp = checkEmptyLoc(up);

          if (pieceOnUp > 15) {
            // Killable
            coloredButt.push(up);
            killable.push(pieceOnUp);
          }

          while (up >= 00 && pieceOnUp == -1) {
            coloredButt.push(up);
            up = up - 10;
            pieceOnUp = checkEmptyLoc(up);
            if (pieceOnUp > 15) {
              // Killable
              coloredButt.push(up);
              killable.push(pieceOnUp);
            }
          }
          // up moving finished
          //left moving start

          left = parseInt(pieceLocArr[pieceId]) - 01;
          pieceOnLeft = checkEmptyLoc(left);

          if (pieceOnLeft > 15) {
            // Killable
            coloredButt.push(left);
            killable.push(pieceOnLeft);
          }

          while (
            left >= parseInt(pieceLocArr[pieceId] / 10) * 10 &&
            pieceOnLeft == -1
          ) {
            coloredButt.push(left);
            left = left - 1;
            pieceOnLeft = checkEmptyLoc(left);
            if (pieceOnLeft > 15) {
              // Killable
              coloredButt.push(left);
              killable.push(pieceOnLeft);
            }
          }
          // left moving finished
          // right moving start

          right = parseInt(pieceLocArr[pieceId]) + 01;
          pieceOnRight = checkEmptyLoc(right);
          console.log("piece on right ", pieceOnRight);
          if (pieceOnRight > 15) {
            // Killable
            coloredButt.push(right);
            killable.push(pieceOnRight);
          }

          while (
            right <= parseInt(pieceLocArr[pieceId] / 10) * 10 + 7 &&
            pieceOnRight == -1
          ) {
            coloredButt.push(right);
            right = right + 01;
            pieceOnRight = checkEmptyLoc(right);
            if (pieceOnRight > 15) {
              // Killable
              coloredButt.push(right);
              killable.push(pieceOnRight);
            }
          }
          // right moving finished
          // black rook coding done
        } else if (pieceId == 1 || pieceId == 6) {
          // black knight
          let top = (parseInt(pieceLocArr[pieceId] / 10) - 2) * 10;
          let left = (pieceLocArr[pieceId] % 10) - 1;
          let bottom = (parseInt(pieceLocArr[pieceId] / 10) + 2) * 10;
          let right = (pieceLocArr[pieceId] % 10) + 1;

          //2nd level top
          if (top >= 00) {
            if (left < 8 && left >= 0) {
              //topLeft coding
              pieceOnTopLeft = checkEmptyLoc(top + left);
              if (pieceOnTopLeft == -1) coloredButt.push(top + left);
              else if (pieceOnTopLeft > 15) {
                // Killable
                coloredButt.push(top + left);
                killable.push(pieceOnTopLeft);
              }
            } else console.log("left is not ok", top, left);
            if (right > 0 && right < 8) {
              //topRight coding
              pieceOnTopRight = checkEmptyLoc(top + right);
              if (pieceOnTopRight == -1) coloredButt.push(top + right);
              else if (pieceOnTopRight > 15) {
                // Killable
                coloredButt.push(top + right);
                killable.push(pieceOnTopRight);
              }
            }
          }
          //2nd level bottom
          if (bottom <= 77) {
            if (left < 8 && left >= 0) {
              //bottomLeft coding
              pieceOnBottomLeft = checkEmptyLoc(bottom + left);
              if (pieceOnBottomLeft == -1) coloredButt.push(bottom + left);
              else if (pieceOnBottomLeft > 15) {
                // Killable
                coloredButt.push(bottom + left);
                killable.push(pieceOnBottomLeft);
              }
            }
            if (right > 0 && right < 8) {
              //bottomRight coding
              pieceOnBottomRight = checkEmptyLoc(bottom + right);
              if (pieceOnBottomRight == -1) coloredButt.push(bottom + right);
              else if (pieceOnBottomRight > 15) {
                // Killable
                coloredButt.push(bottom + right);
                killable.push(pieceOnBottomRight);
              }
            }
          }
          //1 level
          top = top + 10;
          bottom = bottom - 10;
          left--;
          right++;

          if (top >= 00) {
            if (left >= 0 && left < 8) {
              //leftTop coding
              pieceOnTopLeft = checkEmptyLoc(top + left);
              if (pieceOnTopLeft == -1) coloredButt.push(top + left);
              else if (pieceOnTopLeft > 15) {
                // Killable
                coloredButt.push(top + left);
                killable.push(pieceOnTopLeft);
              }
            } else console.log("left is not ok", top, left);
            if (right > 0 && right < 8) {
              //rightTop coding
              pieceOnTopRight = checkEmptyLoc(top + right);
              if (pieceOnTopRight == -1) coloredButt.push(top + right);
              else if (pieceOnTopRight > 15) {
                // Killable
                coloredButt.push(top + right);
                killable.push(pieceOnTopRight);
              }
            }
          }
          //1st level bottom
          if (bottom <= 77) {
            if (left >= 0 && left < 8) {
              //left bottom coding
              pieceOnBottomLeft = checkEmptyLoc(bottom + left);
              if (pieceOnBottomLeft == -1) coloredButt.push(bottom + left);
              else if (pieceOnBottomLeft > 15) {
                // Killable
                coloredButt.push(bottom + left);
                killable.push(pieceOnBottomLeft);
              }
            }
            if (right > 0 && right < 8) {
              //bottomRight coding
              pieceOnBottomRight = checkEmptyLoc(bottom + right);
              if (pieceOnBottomRight == -1) coloredButt.push(bottom + right);
              else if (pieceOnBottomRight > 15) {
                // Killable
                coloredButt.push(bottom + right);
                killable.push(pieceOnBottomRight);
              }
            }
          }
          //black knight coding done
        } else if (pieceId == 2 || pieceId == 5) {
          //black bishop
          //downLeft moving start
          downLeft = parseInt(pieceLocArr[pieceId]) + 9;
          pieceOnDownLeft = checkEmptyLoc(downLeft);

          if (
            pieceOnDownLeft > 15 &&
            parseInt(downLeft / 10) > parseInt((downLeft - 9) / 10)
          ) {
            // Killable
            coloredButt.push(downLeft);
            killable.push(pieceOnDownLeft);
          }

          while (
            downLeft <= 77 &&
            pieceOnDownLeft == -1 &&
            parseInt(downLeft / 10) > parseInt((downLeft - 9) / 10)
          ) {
            coloredButt.push(downLeft);
            downLeft = downLeft + 9;
            pieceOnDownLeft = checkEmptyLoc(downLeft);
            if (
              pieceOnDownLeft > 15 &&
              parseInt(downLeft / 10) > parseInt((downLeft - 9) / 10)
            ) {
              // Killable
              coloredButt.push(downLeft);
              killable.push(pieceOnDownLeft);
            }
          }
          // downLeft moving finished
          //upLeft moving start
          upLeft = parseInt(pieceLocArr[pieceId]) - 11;
          pieceOnUpLeft = checkEmptyLoc(upLeft);

          if (pieceOnUpLeft > 15) {
            // Killable
            coloredButt.push(upLeft);
            killable.push(pieceOnUpLeft);
          }

          while (upLeft >= 00 && pieceOnUpLeft == -1 && upLeft % 10 != 9) {
            coloredButt.push(upLeft);
            upLeft = upLeft - 11;
            pieceOnUpLeft = checkEmptyLoc(upLeft);
            if (pieceOnUpLeft > 15) {
              // Killable
              coloredButt.push(upLeft);
              killable.push(pieceOnUpLeft);
            }
          }
          // upLeft moving finished
          // upRight moving start

          upRight = parseInt(pieceLocArr[pieceId]) - 9;
          pieceOnUpRight = checkEmptyLoc(upRight);

          if (pieceOnUpRight > 15) {
            // Killable
            coloredButt.push(upRight);
            killable.push(pieceOnUpRight);
          }

          while (upRight >= 00 && pieceOnUpRight == -1 && upRight % 10 < 8) {
            coloredButt.push(upRight);
            upRight = upRight - 9;
            pieceOnUpRight = checkEmptyLoc(upRight);
            if (pieceOnUpRight > 15) {
              // Killable
              coloredButt.push(upRight);
              killable.push(pieceOnUpRight);
            }
          }
          // upRight moving finished
          // downRight moving start

          downRight = parseInt(pieceLocArr[pieceId]) + 11;
          pieceOnDownRight = checkEmptyLoc(downRight);

          if (pieceOnDownRight > 15) {
            // Killable
            coloredButt.push(downRight);
            killable.push(pieceOnDownRight);
          }

          while (
            downRight <= 77 &&
            pieceOnDownRight == -1 &&
            downRight % 10 < 8
          ) {
            coloredButt.push(downRight);
            downRight = downRight + 11;
            pieceOnDownRight = checkEmptyLoc(downRight);
            if (pieceOnDownRight > 15) {
              // Killable
              coloredButt.push(downRight);
              killable.push(pieceOnDownRight);
            }
          }
          // downRight moving finished
          // black bishop coding done
        } else if (pieceId == 4) {
          //black queen
          //down moving start
          down = parseInt(pieceLocArr[pieceId]) + 10;
          pieceOnDown = checkEmptyLoc(down);

          if (pieceOnDown > 15) {
            // Killable
            coloredButt.push(down);
            killable.push(pieceOnDown);
          }

          while (down <= 77 && pieceOnDown == -1) {
            coloredButt.push(down);
            down = down + 10;
            pieceOnDown = checkEmptyLoc(down);
            if (pieceOnDown > 15) {
              // Killable
              coloredButt.push(down);
              killable.push(pieceOnDown);
            }
          }
          // down moving finished
          //up moving start
          up = parseInt(pieceLocArr[pieceId]) - 10;
          pieceOnUp = checkEmptyLoc(up);

          if (pieceOnUp > 15) {
            // Killable
            coloredButt.push(up);
            killable.push(pieceOnUp);
          }

          while (up >= 00 && pieceOnUp == -1) {
            coloredButt.push(up);
            up = up - 10;
            pieceOnUp = checkEmptyLoc(up);
            if (pieceOnUp > 15) {
              // Killable
              coloredButt.push(up);
              killable.push(pieceOnUp);
            }
          }
          // up moving finished
          //left moving start

          left = parseInt(pieceLocArr[pieceId]) - 01;
          pieceOnLeft = checkEmptyLoc(left);

          if (pieceOnLeft > 15) {
            // Killable
            coloredButt.push(left);
            killable.push(pieceOnLeft);
          }

          while (
            left >= parseInt(pieceLocArr[pieceId] / 10) * 10 &&
            pieceOnLeft == -1
          ) {
            coloredButt.push(left);
            left = left - 1;
            pieceOnLeft = checkEmptyLoc(left);
            if (pieceOnLeft > 15) {
              // Killable
              coloredButt.push(left);
              killable.push(pieceOnLeft);
            }
          }
          // left moving finished
          // right moving start

          right = parseInt(pieceLocArr[pieceId]) + 01;
          pieceOnRight = checkEmptyLoc(right);
          console.log("piece on right ", pieceOnRight);
          if (pieceOnRight > 15) {
            // Killable
            coloredButt.push(right);
            killable.push(pieceOnRight);
          }

          while (
            right <= parseInt(pieceLocArr[pieceId] / 10) * 10 + 7 &&
            pieceOnRight == -1
          ) {
            coloredButt.push(right);
            right = right + 01;
            pieceOnRight = checkEmptyLoc(right);
            if (pieceOnRight > 15) {
              // Killable
              coloredButt.push(right);
              killable.push(pieceOnRight);
            }
          }
          // right moving finished
          //downLeft moving start
          downLeft = parseInt(pieceLocArr[pieceId]) + 9;
          pieceOnDownLeft = checkEmptyLoc(downLeft);

          if (
            pieceOnDownLeft > 15 &&
            parseInt(downLeft / 10) > parseInt((downLeft - 9) / 10)
          ) {
            // Killable
            coloredButt.push(downLeft);
            killable.push(pieceOnDownLeft);
          }

          while (
            downLeft <= 77 &&
            pieceOnDownLeft == -1 &&
            parseInt(downLeft / 10) > parseInt((downLeft - 9) / 10)
          ) {
            coloredButt.push(downLeft);
            downLeft = downLeft + 9;
            pieceOnDownLeft = checkEmptyLoc(downLeft);
            if (
              pieceOnDownLeft > 15 &&
              parseInt(downLeft / 10) > parseInt((downLeft - 9) / 10)
            ) {
              // Killable
              coloredButt.push(downLeft);
              killable.push(pieceOnDownLeft);
            }
          }
          // downLeft moving finished
          //upLeft moving start
          upLeft = parseInt(pieceLocArr[pieceId]) - 11;
          pieceOnUpLeft = checkEmptyLoc(upLeft);

          if (pieceOnUpLeft > 15) {
            // Killable
            coloredButt.push(upLeft);
            killable.push(pieceOnUpLeft);
          }

          while (upLeft >= 00 && pieceOnUpLeft == -1 && upLeft % 10 != 9) {
            coloredButt.push(upLeft);
            upLeft = upLeft - 11;
            pieceOnUpLeft = checkEmptyLoc(upLeft);
            if (pieceOnUpLeft > 15) {
              // Killable
              coloredButt.push(upLeft);
              killable.push(pieceOnUpLeft);
            }
          }
          // upLeft moving finished
          // upRight moving start

          upRight = parseInt(pieceLocArr[pieceId]) - 9;
          pieceOnUpRight = checkEmptyLoc(upRight);

          if (pieceOnUpRight > 15) {
            // Killable
            coloredButt.push(upRight);
            killable.push(pieceOnUpRight);
          }

          while (upRight >= 00 && pieceOnUpRight == -1 && upRight % 10 < 8) {
            coloredButt.push(upRight);
            upRight = upRight - 9;
            pieceOnUpRight = checkEmptyLoc(upRight);
            if (pieceOnUpRight > 15) {
              // Killable
              coloredButt.push(upRight);
              killable.push(pieceOnUpRight);
            }
          }
          // upRight moving finished
          // downRight moving start

          downRight = parseInt(pieceLocArr[pieceId]) + 11;
          pieceOnDownRight = checkEmptyLoc(downRight);

          if (pieceOnDownRight > 15) {
            // Killable
            coloredButt.push(downRight);
            killable.push(pieceOnDownRight);
          }

          while (
            downRight <= 77 &&
            pieceOnDownRight == -1 &&
            downRight % 10 < 8
          ) {
            coloredButt.push(downRight);
            downRight = downRight + 11;
            pieceOnDownRight = checkEmptyLoc(downRight);
            if (pieceOnDownRight > 15) {
              // Killable
              coloredButt.push(downRight);
              killable.push(pieceOnDownRight);
            }
          }
          // downRight moving finished
          // black queen coding done
        } else if (pieceId == 3) {
          // black king
          // moving down
          downLoc = parseInt(pieceLocArr[pieceId]) + 10;
          pieceOnDown = checkEmptyLoc(downLoc);

          if (pieceOnDown == -1 && downLoc <= 77) {
            coloredButt.push(downLoc);
          } else if (pieceOnDown > 15) {
            // killable
            coloredButt.push(downLoc);
            killable.push(pieceOnDown);
          }
          // down moving done
          // moving up
          upLoc = parseInt(pieceLocArr[pieceId]) - 10;
          pieceOnUp = checkEmptyLoc(upLoc);

          if (pieceOnUp == -1 && upLoc >= 00) {
            coloredButt.push(upLoc);
          } else if (pieceOnUp > 15) {
            // killable
            coloredButt.push(upLoc);
            killable.push(pieceOnUp);
          }
          // up moving done
          // moving left
          let left = parseInt(pieceLocArr[pieceId]) - 1;
          pieceOnLeft = checkEmptyLoc(left);

          if (pieceOnLeft == -1 && left % 10 < 7 && left >= 00) {
            coloredButt.push(left);
          } else if (pieceOnLeft > 15) {
            // killable
            coloredButt.push(left);
            killable.push(pieceOnLeft);
          }
          // left moving done
          // moving right
          let right = parseInt(pieceLocArr[pieceId]) + 1;
          pieceOnRight = checkEmptyLoc(right);

          if (pieceOnRight == -1 && right % 10 <= 7 && right <= 77) {
            coloredButt.push(right);
          } else if (pieceOnRight > 15) {
            // killable
            coloredButt.push(right);
            killable.push(pieceOnRight);
          }
          // right moving done
          // moving leftUp
          let leftUp = parseInt(pieceLocArr[pieceId]) - 11;
          pieceOnLeftUp = checkEmptyLoc(leftUp);

          if (pieceOnLeftUp == -1 && leftUp % 10 <= 7 && leftUp >= 00) {
            coloredButt.push(leftUp);
          } else if (pieceOnLeftUp > 15) {
            // killable
            coloredButt.push(leftUp);
            killable.push(pieceOnLeftUp);
          }
          // leftUp moving done
          // moving rightUp
          let rightUp = parseInt(pieceLocArr[pieceId]) - 9;
          pieceOnRightUp = checkEmptyLoc(rightUp);

          if (pieceOnRightUp == -1 && rightUp % 10 <= 7 && rightUp >= 00) {
            coloredButt.push(rightUp);
          } else if (pieceOnRightUp > 15) {
            // killable
            coloredButt.push(rightUp);
            killable.push(pieceOnRightUp);
          }
          // leftUp moving done

          // moving rightDown
          let rightDown = parseInt(pieceLocArr[pieceId]) + 11;
          pieceOnRightDown = checkEmptyLoc(rightDown);

          if (
            pieceOnRightDown == -1 &&
            rightDown % 10 <= 7 &&
            rightDown <= 77
          ) {
            coloredButt.push(rightDown);
          } else if (pieceOnRightDown > 15) {
            // killable
            coloredButt.push(rightDown);
            killable.push(pieceOnRightDown);
          }
          // rightDown moving done
          // leftDown moving
          let leftDown = parseInt(pieceLocArr[pieceId]) + 9;
          pieceOnLeftDown = checkEmptyLoc(leftDown);

          if (pieceOnLeftDown == -1 && leftDown % 10 <= 7 && leftDown <= 77) {
            coloredButt.push(leftDown);
          } else if (pieceOnLeftDown > 15) {
            // killable
            coloredButt.push(leftDown);
            killable.push(pieceOnLeftDown);
          }
          // leftDown moving done
          // black king coding done
        }
      } // black piece coding done
    } else if (isMycolorWhite) {
      // white piece
      selectedPiece = pieceId;
      if (pieceId < 24) {
        // white pawn

        upLoc = parseInt(pieceLocArr[pieceId]) - 10;
        leftUpLoc = upLoc - 1;
        pieceOnUpLeft = checkEmptyLoc(leftUpLoc);
        rightUpLoc = upLoc + 1;
        pieceOnUpRight = checkEmptyLoc(rightUpLoc);

        //check if it can move up

        if (checkEmptyLoc(upLoc) == -1 && upLoc >= 0) {
          coloredButt.push(upLoc);
        }
        if (pieceOnUpLeft != -1) {
          if (pieceOnUpLeft < 16) {
            coloredButt.push(leftUpLoc);
            killable.push(pieceOnUpLeft);
          }
        }
        if (pieceOnUpRight != -1) {
          if (pieceOnUpRight < 16) {
            coloredButt.push(rightUpLoc);
            killable.push(pieceOnUpRight);
          }
        }
      } else if (pieceId == 24 || pieceId == 31) {
        //white rook
        //down moving start
        down = parseInt(pieceLocArr[pieceId]) + 10;
        pieceOnDown = checkEmptyLoc(down);

        if (pieceOnDown < 16 && pieceOnDown != -1) {
          // Killable
          coloredButt.push(down);
          killable.push(pieceOnDown);
        }

        while (down <= 77 && pieceOnDown == -1) {
          coloredButt.push(down);
          down = down + 10;
          pieceOnDown = checkEmptyLoc(down);
          if (pieceOnDown < 16 && pieceOnDown != -1) {
            // Killable
            coloredButt.push(down);
            killable.push(pieceOnDown);
          }
        }
        // down moving finished
        //up moving start
        up = parseInt(pieceLocArr[pieceId]) - 10;
        pieceOnUp = checkEmptyLoc(up);

        if (pieceOnUp < 16 && pieceOnUp != -1) {
          // Killable
          coloredButt.push(up);
          killable.push(pieceOnUp);
        }

        while (up >= 00 && pieceOnUp == -1) {
          coloredButt.push(up);
          up = up - 10;
          pieceOnUp = checkEmptyLoc(up);
          if (pieceOnUp < 16 && pieceOnUp != -1) {
            // Killable
            coloredButt.push(up);
            killable.push(pieceOnUp);
          }
        }
        // up moving finished
        //left moving start

        left = parseInt(pieceLocArr[pieceId]) - 01;
        pieceOnLeft = checkEmptyLoc(left);

        if (pieceOnLeft < 16 && pieceOnLeft != -1) {
          // Killable
          coloredButt.push(left);
          killable.push(pieceOnLeft);
        }

        while (
          left >= parseInt(pieceLocArr[pieceId] / 10) * 10 &&
          pieceOnLeft == -1
        ) {
          coloredButt.push(left);
          left = left - 1;
          pieceOnLeft = checkEmptyLoc(left);
          if (pieceOnLeft < 16 && pieceOnLeft != -1) {
            // Killable
            coloredButt.push(left);
            killable.push(pieceOnLeft);
          }
        }
        // left moving finished
        // right moving start

        right = parseInt(pieceLocArr[pieceId]) + 01;
        pieceOnRight = checkEmptyLoc(right);
        console.log("piece on right ", pieceOnRight);
        if (pieceOnRight < 16 && pieceOnRight != -1) {
          // Killable
          coloredButt.push(right);
          killable.push(pieceOnRight);
        }

        while (
          right <= parseInt(pieceLocArr[pieceId] / 10) * 10 + 7 &&
          pieceOnRight == -1
        ) {
          coloredButt.push(right);
          right = right + 01;
          pieceOnRight = checkEmptyLoc(right);
          if (pieceOnRight < 16 && pieceOnRight != -1) {
            // Killable
            coloredButt.push(right);
            killable.push(pieceOnRight);
          }
        }
        // right moving finished
        //white rook coding done
      } else if (pieceId == 25 || pieceId == 30) {
        // white knight
        let top = (parseInt(pieceLocArr[pieceId] / 10) - 2) * 10;
        let left = (pieceLocArr[pieceId] % 10) - 1;
        let bottom = (parseInt(pieceLocArr[pieceId] / 10) + 2) * 10;
        let right = (pieceLocArr[pieceId] % 10) + 1;

        //2nd level top
        if (top >= 00) {
          if (left < 8 && left >= 0) {
            //topLeft coding
            pieceOnTopLeft = checkEmptyLoc(top + left);
            if (pieceOnTopLeft == -1) coloredButt.push(top + left);
            else if (pieceOnTopLeft <= 15) {
              // Killable
              coloredButt.push(top + left);
              killable.push(pieceOnTopLeft);
            }
          }
          if (right > 0 && right < 8) {
            //topRight coding
            pieceOnTopRight = checkEmptyLoc(top + right);
            if (pieceOnTopRight == -1) coloredButt.push(top + right);
            else if (pieceOnTopRight <= 15) {
              // Killable
              coloredButt.push(top + right);
              killable.push(pieceOnTopRight);
            }
          }
        }
        //2nd level bottom
        if (bottom <= 77) {
          if (left < 8 && left >= 0) {
            //bottomLeft coding
            pieceOnBottomLeft = checkEmptyLoc(bottom + left);
            if (pieceOnBottomLeft == -1) coloredButt.push(bottom + left);
            else if (pieceOnBottomLeft <= 15) {
              // Killable
              coloredButt.push(bottom + left);
              killable.push(pieceOnBottomLeft);
            }
          }
          if (right > 0 && right < 8) {
            //bottomRight coding
            pieceOnBottomRight = checkEmptyLoc(bottom + right);
            if (pieceOnBottomRight == -1) coloredButt.push(bottom + right);
            else if (pieceOnBottomRight <= 15) {
              // Killable
              coloredButt.push(bottom + right);
              killable.push(pieceOnBottomRight);
            }
          }
        }
        //1 level
        top = top + 10;
        bottom = bottom - 10;
        left--;
        right++;

        if (top >= 00) {
          if (left >= 0 && left < 8) {
            //leftTop coding
            pieceOnTopLeft = checkEmptyLoc(top + left);
            if (pieceOnTopLeft == -1) coloredButt.push(top + left);
            else if (pieceOnTopLeft <= 15) {
              // Killable
              coloredButt.push(top + left);
              killable.push(pieceOnTopLeft);
            }
          }
          if (right > 0 && right < 8) {
            //rightTop coding
            pieceOnTopRight = checkEmptyLoc(top + right);
            if (pieceOnTopRight == -1) coloredButt.push(top + right);
            else if (pieceOnTopRight <= 15) {
              // Killable
              coloredButt.push(top + right);
              killable.push(pieceOnTopRight);
            }
          }
        }
        //1st level bottom
        if (bottom <= 77) {
          if (left >= 0 && left < 8) {
            //left bottom coding
            pieceOnBottomLeft = checkEmptyLoc(bottom + left);
            if (pieceOnBottomLeft == -1) coloredButt.push(bottom + left);
            else if (pieceOnBottomLeft <= 15) {
              // Killable
              coloredButt.push(bottom + left);
              killable.push(pieceOnBottomLeft);
            }
          }
          if (right > 0 && right < 8) {
            //bottomRight coding
            pieceOnBottomRight = checkEmptyLoc(bottom + right);
            if (pieceOnBottomRight == -1) coloredButt.push(bottom + right);
            else if (pieceOnBottomRight <= 15) {
              // Killable
              coloredButt.push(bottom + right);
              killable.push(pieceOnBottomRight);
            }
          }
        }
        // white knight coding done
      } else if (pieceId == 26 || pieceId == 29) {
        //white bishop
        //downLeft moving start
        downLeft = parseInt(pieceLocArr[pieceId]) + 9;
        pieceOnDownLeft = checkEmptyLoc(downLeft);

        if (
          pieceOnDownLeft != -1 &&
          pieceOnDownLeft <= 15 &&
          parseInt(downLeft / 10) > parseInt((downLeft - 9) / 10)
        ) {
          // Killable
          coloredButt.push(downLeft);
          killable.push(pieceOnDownLeft);
        }

        while (
          downLeft <= 77 &&
          pieceOnDownLeft == -1 &&
          parseInt(downLeft / 10) > parseInt((downLeft - 9) / 10)
        ) {
          coloredButt.push(downLeft);
          downLeft = downLeft + 9;
          pieceOnDownLeft = checkEmptyLoc(downLeft);
          if (
            pieceOnDownLeft != -1 &&
            pieceOnDownLeft <= 15 &&
            parseInt(downLeft / 10) > parseInt((downLeft - 9) / 10)
          ) {
            // Killable
            coloredButt.push(downLeft);
            killable.push(pieceOnDownLeft);
          }
        } //bookmark
        // downLeft moving finished
        //upLeft moving start
        upLeft = parseInt(pieceLocArr[pieceId]) - 11;
        pieceOnUpLeft = checkEmptyLoc(upLeft);

        if (pieceOnUpLeft <= 15 && pieceOnUpLeft != -1) {
          // Killable
          coloredButt.push(upLeft);
          killable.push(pieceOnUpLeft);
        }

        while (upLeft >= 00 && pieceOnUpLeft == -1 && upLeft % 10 != 9) {
          coloredButt.push(upLeft);
          upLeft = upLeft - 11;
          pieceOnUpLeft = checkEmptyLoc(upLeft);
          if (pieceOnUpLeft <= 15 && pieceOnUpLeft != -1) {
            // Killable
            coloredButt.push(upLeft);
            killable.push(pieceOnUpLeft);
          }
        }
        // upLeft moving finished
        // upRight moving start

        upRight = parseInt(pieceLocArr[pieceId]) - 9;
        pieceOnUpRight = checkEmptyLoc(upRight);

        if (pieceOnUpRight <= 15 && pieceOnUpRight != -1) {
          // Killable
          coloredButt.push(upRight);
          killable.push(pieceOnUpRight);
        }

        while (upRight >= 00 && pieceOnUpRight == -1 && upRight % 10 < 8) {
          coloredButt.push(upRight);
          upRight = upRight - 9;
          pieceOnUpRight = checkEmptyLoc(upRight);
          if (pieceOnUpRight <= 15 && pieceOnUpRight != -1) {
            // Killable
            coloredButt.push(upRight);
            killable.push(pieceOnUpRight);
          }
        }
        // upRight moving finished
        // downRight moving start

        downRight = parseInt(pieceLocArr[pieceId]) + 11;
        pieceOnDownRight = checkEmptyLoc(downRight);

        if (pieceOnDownRight <= 15 && pieceOnDownRight != -1) {
          // Killable
          coloredButt.push(downRight);
          killable.push(pieceOnDownRight);
        }

        while (
          downRight <= 77 &&
          pieceOnDownRight == -1 &&
          downRight % 10 < 8
        ) {
          coloredButt.push(downRight);
          downRight = downRight + 11;
          pieceOnDownRight = checkEmptyLoc(downRight);
          if (pieceOnDownRight <= 15 && pieceOnDownRight != -1) {
            // Killable
            coloredButt.push(downRight);
            killable.push(pieceOnDownRight);
          }
        }
        // downRight moving finished
        // white bishop coding done
      } else if (pieceId == 27) {
        //white queen
        //down moving start
        down = parseInt(pieceLocArr[pieceId]) + 10;
        pieceOnDown = checkEmptyLoc(down);

        if (pieceOnDown < 16 && pieceOnDown != -1) {
          // Killable
          coloredButt.push(down);
          killable.push(pieceOnDown);
        }

        while (down <= 77 && pieceOnDown == -1) {
          coloredButt.push(down);
          down = down + 10;
          pieceOnDown = checkEmptyLoc(down);
          if (pieceOnDown < 16 && pieceOnDown != -1) {
            // Killable
            coloredButt.push(down);
            killable.push(pieceOnDown);
          }
        }
        // down moving finished
        //up moving start
        up = parseInt(pieceLocArr[pieceId]) - 10;
        pieceOnUp = checkEmptyLoc(up);

        if (pieceOnUp < 16 && pieceOnUp != -1) {
          // Killable
          coloredButt.push(up);
          killable.push(pieceOnUp);
        }

        while (up >= 00 && pieceOnUp == -1) {
          coloredButt.push(up);
          up = up - 10;
          pieceOnUp = checkEmptyLoc(up);
          if (pieceOnUp < 16 && pieceOnUp != -1) {
            // Killable
            coloredButt.push(up);
            killable.push(pieceOnUp);
          }
        }
        // up moving finished
        //left moving start

        left = parseInt(pieceLocArr[pieceId]) - 01;
        pieceOnLeft = checkEmptyLoc(left);

        if (pieceOnLeft < 16 && pieceOnLeft != -1) {
          // Killable
          coloredButt.push(left);
          killable.push(pieceOnLeft);
        }

        while (
          left >= parseInt(pieceLocArr[pieceId] / 10) * 10 &&
          pieceOnLeft == -1
        ) {
          coloredButt.push(left);
          left = left - 1;
          pieceOnLeft = checkEmptyLoc(left);
          if (pieceOnLeft < 16 && pieceOnLeft != -1) {
            // Killable
            coloredButt.push(left);
            killable.push(pieceOnLeft);
          }
        }
        // left moving finished
        // right moving start

        right = parseInt(pieceLocArr[pieceId]) + 01;
        pieceOnRight = checkEmptyLoc(right);
        console.log("piece on right ", pieceOnRight);
        if (pieceOnRight < 16 && pieceOnRight != -1) {
          // Killable
          coloredButt.push(right);
          killable.push(pieceOnRight);
        }

        while (
          right <= parseInt(pieceLocArr[pieceId] / 10) * 10 + 7 &&
          pieceOnRight == -1
        ) {
          coloredButt.push(right);
          right = right + 01;
          pieceOnRight = checkEmptyLoc(right);
          if (pieceOnRight < 16 && pieceOnRight != -1) {
            // Killable
            coloredButt.push(right);
            killable.push(pieceOnRight);
          }
        }
        // right moving finished
        //downLeft moving start
        downLeft = parseInt(pieceLocArr[pieceId]) + 9;
        pieceOnDownLeft = checkEmptyLoc(downLeft);

        if (
          pieceOnDownLeft != -1 &&
          pieceOnDownLeft <= 15 &&
          parseInt(downLeft / 10) > parseInt((downLeft - 9) / 10)
        ) {
          // Killable
          coloredButt.push(downLeft);
          killable.push(pieceOnDownLeft);
        }

        while (
          downLeft <= 77 &&
          pieceOnDownLeft == -1 &&
          parseInt(downLeft / 10) > parseInt((downLeft - 9) / 10)
        ) {
          coloredButt.push(downLeft);
          downLeft = downLeft + 9;
          pieceOnDownLeft = checkEmptyLoc(downLeft);
          if (
            pieceOnDownLeft != -1 &&
            pieceOnDownLeft <= 15 &&
            parseInt(downLeft / 10) > parseInt((downLeft - 9) / 10)
          ) {
            // Killable
            coloredButt.push(downLeft);
            killable.push(pieceOnDownLeft);
          }
        } //bookmark
        // downLeft moving finished
        //upLeft moving start
        upLeft = parseInt(pieceLocArr[pieceId]) - 11;
        pieceOnUpLeft = checkEmptyLoc(upLeft);

        if (pieceOnUpLeft <= 15 && pieceOnUpLeft != -1) {
          // Killable
          coloredButt.push(upLeft);
          killable.push(pieceOnUpLeft);
        }

        while (upLeft >= 00 && pieceOnUpLeft == -1 && upLeft % 10 != 9) {
          coloredButt.push(upLeft);
          upLeft = upLeft - 11;
          pieceOnUpLeft = checkEmptyLoc(upLeft);
          if (pieceOnUpLeft <= 15 && pieceOnUpLeft != -1) {
            // Killable
            coloredButt.push(upLeft);
            killable.push(pieceOnUpLeft);
          }
        }
        // upLeft moving finished
        // upRight moving start

        upRight = parseInt(pieceLocArr[pieceId]) - 9;
        pieceOnUpRight = checkEmptyLoc(upRight);

        if (pieceOnUpRight <= 15 && pieceOnUpRight != -1) {
          // Killable
          coloredButt.push(upRight);
          killable.push(pieceOnUpRight);
        }

        while (upRight >= 00 && pieceOnUpRight == -1 && upRight % 10 < 8) {
          coloredButt.push(upRight);
          upRight = upRight - 9;
          pieceOnUpRight = checkEmptyLoc(upRight);
          if (pieceOnUpRight <= 15 && pieceOnUpRight != -1) {
            // Killable
            coloredButt.push(upRight);
            killable.push(pieceOnUpRight);
          }
        }
        // upRight moving finished
        // downRight moving start

        downRight = parseInt(pieceLocArr[pieceId]) + 11;
        pieceOnDownRight = checkEmptyLoc(downRight);

        if (pieceOnDownRight <= 15 && pieceOnDownRight != -1) {
          // Killable
          coloredButt.push(downRight);
          killable.push(pieceOnDownRight);
        }

        while (
          downRight <= 77 &&
          pieceOnDownRight == -1 &&
          downRight % 10 < 8
        ) {
          coloredButt.push(downRight);
          downRight = downRight + 11;
          pieceOnDownRight = checkEmptyLoc(downRight);
          if (pieceOnDownRight <= 15 && pieceOnDownRight != -1) {
            // Killable
            coloredButt.push(downRight);
            killable.push(pieceOnDownRight);
          }
        }
        // downRight moving finished
        // white queen coding done
      } else if (pieceId == 28) {
        // white king
        // moving down
        downLoc = parseInt(pieceLocArr[pieceId]) + 10;
        pieceOnDown = checkEmptyLoc(downLoc);

        if (pieceOnDown == -1 && downLoc <= 77) {
          coloredButt.push(downLoc);
        } else if (pieceOnDown <= 15 && pieceOnDown != -1) {
          // killable
          coloredButt.push(downLoc);
          killable.push(pieceOnDown);
        }
        // down moving done
        // moving up
        upLoc = parseInt(pieceLocArr[pieceId]) - 10;
        pieceOnUp = checkEmptyLoc(upLoc);

        if (pieceOnUp == -1 && upLoc >= 00) {
          coloredButt.push(upLoc);
        } else if (pieceOnUp <= 15 && pieceOnUp != -1) {
          // killable
          coloredButt.push(upLoc);
          killable.push(pieceOnUp);
        }
        // up moving done
        // moving left
        let left = parseInt(pieceLocArr[pieceId]) - 1;
        pieceOnLeft = checkEmptyLoc(left);

        if (pieceOnLeft == -1 && left % 10 < 7 && left >= 00) {
          coloredButt.push(left);
        } else if (pieceOnLeft <= 15 && pieceOnLeft != -1) {
          // killable
          coloredButt.push(left);
          killable.push(pieceOnLeft);
        }
        // left moving done
        // moving right
        let right = parseInt(pieceLocArr[pieceId]) + 1;
        pieceOnRight = checkEmptyLoc(right);

        if (pieceOnRight == -1 && right % 10 <= 7 && right <= 77) {
          coloredButt.push(right);
        } else if (pieceOnRight <= 15 && pieceOnRight != -1) {
          // killable
          coloredButt.push(right);
          killable.push(pieceOnRight);
        }
        // right moving done
        // moving leftUp
        let leftUp = parseInt(pieceLocArr[pieceId]) - 11;
        pieceOnLeftUp = checkEmptyLoc(leftUp);

        if (pieceOnLeftUp == -1 && leftUp % 10 <= 7 && leftUp >= 00) {
          coloredButt.push(leftUp);
        } else if (pieceOnLeftUp <= 15 && pieceOnLeftUp != -1) {
          // killable
          coloredButt.push(leftUp);
          killable.push(pieceOnLeftUp);
        }
        // leftUp moving done
        // moving rightUp
        let rightUp = parseInt(pieceLocArr[pieceId]) - 9;
        pieceOnRightUp = checkEmptyLoc(rightUp);

        if (pieceOnRightUp == -1 && rightUp % 10 <= 7 && rightUp >= 00) {
          coloredButt.push(rightUp);
        } else if (pieceOnRightUp <= 15 && pieceOnRightUp != -1) {
          // killable
          coloredButt.push(rightUp);
          killable.push(pieceOnRightUp);
        }
        // leftUp moving done

        // moving rightDown
        let rightDown = parseInt(pieceLocArr[pieceId]) + 11;
        pieceOnRightDown = checkEmptyLoc(rightDown);

        if (pieceOnRightDown == -1 && rightDown % 10 <= 7 && rightDown <= 77) {
          coloredButt.push(rightDown);
        } else if (pieceOnRightDown <= 15 && pieceOnRightDown != -1) {
          // killable
          coloredButt.push(rightDown);
          killable.push(pieceOnRightDown);
        }
        // rightDown moving done
        // leftDown moving
        let leftDown = parseInt(pieceLocArr[pieceId]) + 9;
        pieceOnLeftDown = checkEmptyLoc(leftDown);

        if (pieceOnLeftDown == -1 && leftDown % 10 <= 7 && leftDown <= 77) {
          coloredButt.push(leftDown);
        } else if (pieceOnLeftDown <= 15 && pieceOnLeftDown != -1) {
          // killable
          coloredButt.push(leftDown);
          killable.push(pieceOnLeftDown);
        }
        // leftDown moving done
        // white king coding done
      }
      // white piece coding done
    }
    colorBut();
  }
}

function checkEmptyLoc(loc) {
  console.log("checking location", loc);
  for (i = 0; i < 32; i++) {
    if (pieceLocArr[i] == loc) return i;
  }
  return -1;
}

function colorBut() {
  console.log("coloring ", coloredButt);
  for (i = 0; i < coloredButt.length; i++) {
    butt = document.getElementById(
      "bgbutr" + parseInt(coloredButt[i] / 10) + "c" + (coloredButt[i] % 10)
    );
    butt.style.backgroundColor = "#129091";
  }
}
function removeButColor() {
  for (i = 0; i < coloredButt.length; i++) {
    butt = document.getElementById(
      "bgbutr" + parseInt(coloredButt[i] / 10) + "c" + (coloredButt[i] % 10)
    );
    if ((parseInt(coloredButt[i] / 10) + (coloredButt[i] % 10)) % 2 != 0) {
      butt.style.removeProperty("background-color");
      butt.style.removeProperty("opacity");
    } else {
      butt.style.opacity = "40%";
      butt.style.backgroundColor = "#666666";
    }
  }
  coloredButt = [];
  killable = [];
}

function putPieces() {
  console.log("putting pieces on board");
  i = 0;
  while (i < 32) {
    var top = parseInt(pieceLocArr[i] / 10);
    var left = pieceLocArr[i] % 10;
    piece = document.getElementById("piece" + i);
    piece.style.top = top * 50;
    piece.style.left = left * 48;

    i++;
  }
  console.log("finished putting pieces");
}
