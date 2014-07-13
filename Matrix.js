Matrix = {
        //¾ØÕó×ªÖÃ
        //|2 0 0 0|    |2 2 2 2|
        //|2 0 0 0|    |0 0 4 8|
        //|2 4 4 0| -> |0 0 4 0|
        //|2 8 0 0|    |0 0 0 0|
        transposition: function (a) {
            for (var i = 0, t = 0; i < n_n; i++) {
                for (var j = i + 1; j < n_n; j++) {
                    t = a[i][j];
                    a[i][j] = a[j][i];
                    a[j][i] = t;
                }
            }
            return a;
        },
        //¾ØÕó¾µÏñ
        //|2 0 0 0|    |0 0 0 2|
        //|2 0 0 0|    |0 0 0 2|
        //|2 4 8 0| -> |0 8 4 2|
        //|2 8 0 0|    |0 0 8 2|
        mirror: function (a) {
            for (var i = 0, t = 0, len = n_n / 2; i < n_n; i++) {
                for (var j = 0; j < len; j++) {
                    t = a[i][j];
                    a[i][j] = a[i][n_n - j - 1];
                    a[i][n_n - j - 1] = t;
                }
            }
            return a;
        },
        //¾ØÕó¾µÏñ ÐèÒªÔ¤ÏÈÅÅ³ý¿ÕÓò
        //|2 4 8 4|    |4 8 8 2|
        //|2 4 0 0|    |4 2 0 0|
        //|2 4 8 0| -> |8 4 2 0|
        //|2 8 0 0|    |8 2 0 0|
        mirror2: function (a) {
            for (var i = 0; i < n_n; i++) {
                for (var j = 0, len = n_n - a[i].length; j < len; j++) {
                    a.unshift(undefined);
                }
            }
        }
    }