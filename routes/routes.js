var appRouter = function(app,connection)
{
    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connection established...');
        //  console.log(result[0]);
        app.get("/",function(req,res){
            connection.query('select * from customers_tbl',function(err,result){
                if(err)
                    throw err;
                return res.json(result);
            })
        });

        app.post("/login", function(req, res) {
            console.log(req.body.pssword);
            console.log(req.body.email);
            if(!req.body.email || !req.body.pssword ) {
                return res.send({"status": "error", "message": "missing a parameter"});
            } else {
                connection.query('select * from customers_tbl where customer_email = '+req.body/email+' and customer_password = '+req.body.pssword,function(err){
                    if(err) {
                        throw err;
                        return res.send("Invalid credentials !");
                    }
                    return res.send({"status":"success"});
                })
            }
        });

        app.post("/register", function(req, res) {
            console.log(req.body.pssword);
            console.log(req.body.name);
            if(!req.body.name || !req.body.pssword ) {
                return res.send({"status": "error", "message": "missing a parameter"});
            } else {
                connection.query('insert into customers_tbl (customer_name,customer_email,customer_password,' +
                    'customer_phone,customer_street_no,customer_city,customer_state,customer_zip_code) values (?,?,?,?,?,?,?,?)',		[req.body.name,req.body.email,req.body.pssword
                    ,req.body.phone,req.body.streetNo,req.body.city,req.body.state,req.body.zipCode],function(err){
                    if(err) {
                        throw err;
                        return res.send("User already registered !");
                    }
                    return res.send({"status":"success"});
                })
            }
        });

	app.get("/stocks", function(req, res) {

                connection.query('select * from stock_item_tbl left join line_item_tbl on stock_item_tbl.stock_item_number = line_item_tbl.stock_item_number',function(err,result){
                    if(err) {
                        throw err;
                    }
                    return res.json(result);
                })
            
        });

        app.put("/update",function(req,res){
            if(!req.body.name || !req.body.pswd) {
                return res.send({"status": "error", "message": "missing a parameter"});
            } else {
                connection.query('update login set customer_password=? where customer_email=?', [req.body.pssword, req.body.email], function (err) {
                    if (err)
                        throw err;
                    return res.send({"status": "success"});
                });
            }//  return res.send({"status": "error", "message": "missing id"});
        });
    })
};

module.exports = appRouter;