$("#add-btn").on("click", function(){
                var survey = [];
                for(var i = 0; i < 10; i++){
                    survey.push($("#question" + (i + 1)).val());     
                }
                var newPerson = {
                    name: $("#name").val().trim(),
                    photo: $("#photo").val().trim(),
                    survey: survey
                  };


                $.post("/api/new", newPerson)
                    .done(function(data) {
                    $("#friend").html("<h5>" + data.name + "</h5><br><img src='" + data.photo + "' style='width: 250px' style='height:250px'>");
                  });
            })