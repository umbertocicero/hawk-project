  var id_to_update = null;
        $(function () {
            getEventi();
        });
        function getEventi() {
            $('#lista_eventi').empty();
            $.get(
                'get_eventi',
                function (resp) {
                    var _rest = $.parseJSON(resp);

                    var trHTML = '<tr>  ';
                    trHTML += '  <th>id</th>';
                    trHTML += '  <th>titolo</th>    <th>data</th>    <th>ora_inizio</th> ';
                    trHTML += '  <th>luogo</th>    <th>n_partecipanti</th>    <th>maggiorenni</th> ';
                    trHTML += '  <th>mail</th>    <th>telefono</th>';
                    trHTML += ' </tr>';
                    $.each(_rest, function (i, item) {

                        var time = moment(item.data);
                        time = time.format('YYYY-MM-DD HH:mm:ss');

                        trHTML += '<tr>';
                        trHTML += '<td>' + item.id + '</td>';
                        trHTML += '<td>' + item.titolo + '</td><td>' + time + '</td><td>' + item.ora_inizio + '</td>';
                        trHTML += '<td>' + item.luogo + '</td><td>' + item.n_partecipanti + '</td><td>' + item.maggiorenni + '</td>';
                        trHTML += '<td>' + item.mail + '</td><td>' + item.telefono + '</td>';

                        trHTML += '<td>' + ' <input type="button" value="Elimina" onclick="delete_event(' + item.id + ')">' + '</td>';
                        trHTML += '<td>' + ' <input type="button" value="Modifica" onclick="update(' + item.id + ')">' + '</td>';
                        trHTML += '</tr>';

                    });
                    $('#lista_eventi').append(trHTML);



                }
            );
        }
        function getEvento(id, callback) {
            $.get(
                'get_evento/' + id,
                function (resp) {
                    callback(resp);
                }
            );
        }

        function get_form_values() {
            var titolo = $("#titolo").val();
            var data = $("#data").val();
            var ora_inizio = $("#ora_inizio").val();
            var ora_fine = $("#ora_fine").val();
            var luogo = $("#luogo").val();
            var n_partecipanti = $("#n_partecipanti").val();
            var maggiorenni = $("#maggiorenni").val();
            var mail = $("#mail").val();
            var telefono = $("#telefono").val();

            var d = {
                'titolo': titolo,
                'data': data,
                'ora_inizio': ora_inizio,
                'ora_fine': ora_fine,
                'luogo': luogo,
                'n_partecipanti': n_partecipanti,
                'maggiorenni': maggiorenni,
                'mail': mail,
                'telefono': telefono
            };
            return d;
        }

        function send() {
            var d = get_form_values();
            $.post(
                'add_event',
                d,
                function (data) {
                    getEventi();
                }
            );
        };



        function delete_event(id) {
            $.ajax({
                url: 'delete/' + id,
                type: 'DELETE',
                success: function (data) {
                    getEventi();
                }
            });

        };


        function send_update() {
            var id = id_to_update;
            if (id != null) {
                var d = get_form_values();
                $.ajax({
                    url: 'update/' + id,
                    data: d,
                    type: 'PUT',
                    success: function (data) {
                        getEventi();
                    }
                });
            } else {
                alert('Selezione prima una riga da dover modificare');
            }
        };

        function update(id) {
            id_to_update = id;
            var callback = function (data) {
                data = $.parseJSON(data);

                var time = moment(data.data);
                time = time.format('YYYY-MM-DD');

                $("#titolo").val(data.titolo);
                $("#data").val(time);
                $("#ora_inizio").val(data.ora_inizio);
                $("#ora_fine").val(data.ora_fine);
                $("#luogo").val(data.luogo);
                $("#n_partecipanti").val(data.n_partecipanti);
                $("#maggiorenni").val(data.maggiorenni);
                $("#mail").val(data.mail);
                $("#telefono").val(data.telefono);


                $("#update").val("Update id: " + id);
            };
            getEvento(id, callback);
        }