'use strict'; /*jslint node:true*/

function find_player(screen){
    for (let y = 0; y<screen.length; y++)
    {
        let row = screen[y];
        for (let x = 0; x<row.length; x++)
        {
            if (row[x]=='A')
                return {x, y};
        }
    }
}

function change_direct(dir) {
    let new_dir = '';
    switch(dir) {
        case 'u':
            new_dir = 'd';
            break;
        case 'd':
            new_dir = 'u';
            break;
        case 'l':
            new_dir = 'r';
            break;
        case 'r':
            new_dir = 'r';
            break;
    }
    return new_dir;
}

function check_dunger(screen, dir, x, y) {
    let new_y = y;
    let new_x = x;
    switch(dir) {
        case 'u':
            new_y = y + 1;
            break;
        case 'd':
            new_y = y - 1;
            break;
        case 'l':
            new_x = x + 1;
            break;
        case 'r':
            new_x = x - 1;
            break;
    }
    if (screen[new_y][new_x] == '/' || screen[new_y][new_x] == '\\' || screen[new_y][new_x] == '|' || screen[new_y][new_x] == '-') {
        return true;
    } else {
        return false;
    }
}

function check_stone(screen, x,y) {
    return screen[y - 1][x] == '0'
}

exports.play = function*(screen){
    while (true){
        let move = '';
        let {x, y} = find_player(screen);
        let moves = '';
        if (' :*'.includes(screen[y-1][x]))
            moves += 'u';
        if (' :*'.includes(screen[y+1][x]))
            moves += 'd';
        if (' :*'.includes(screen[y][x+1])
            || screen[y][x+1]=='O' && screen[y][x+2]==' ')
        {
            moves += 'r';
        }
        if (' :*'.includes(screen[y][x-1])
            || screen[y][x-1]=='O' && screen[y][x-2]==' ')
        {
            moves += 'l';
        }

        move = moves[Math.floor(Math.random()*moves.length)];

        if (check_stone(screen, x,y)) {
            move = 'r'
        }

        if (check_dunger(screen, move, x, y)) {
            move = change_direct(move)
        }
        yield moves[Math.floor(Math.random()*moves.length)];
    }
};
