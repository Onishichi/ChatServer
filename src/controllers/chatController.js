"use strict";

module.exports = ( io ) =>
{
    //新しい接続を監視する
    io.on( "connection", ( client ) =>
    {
        console.log( `new connection from ${client.id}` );

        //ユーザーの接続断を監視する
        client.on("disconnect", () => {
            console.log("user disconnect");
        });

        //チャットルームに参加する
        client.on( "joinRoom", ( roomID ) =>
        {
            client.join( roomID );
            console.log( `${ client.id } joined ${ roomID }` );
        });

        //カスタムメッセージイベントを監視する
        client.on( "message", (data) =>
        {
            try
            {
                io.emit( "message", { ...data, date: Date.now() });
                console.log( "message", data );
            }
            catch ( e )
            {
                console.error(e);
            }

        });
    });
};
