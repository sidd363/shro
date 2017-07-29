var mongoose = require('mongoose');
var books = mongoose.model('book');
var async = require('async');
var users = mongoose.model('User');


/*{
    "globalbookid": "CM16706492",
    "title": "Lone Star Politics",
    "authors": [{
        "middlename": "\n",
        "lastname": "Clinkscale",
        "firstname": "David"
    }, {
        "middlename": "\n",
        "lastname": "Benson",
        "firstname": "Paul"
    }, {
        "middlename": "\n",
        "lastname": "Giardino",
        "firstname": "Anthony"
    }],
    "ebookisbn10": "prod_title",
    "ebookisbn13": "prod_title",
    "printisbn10": "0205927793",
    "printisbn13": "9780205927791",
    "librarysupported": 1,
    "editiontype": "commonedition",
    "previewlink": ""
}*/

exports.addNewBook = function(req, res, next){
	var payload = req.body;
	var authors = payload.authors.split(',');
	payload.authors = authors;
	var bookObj = new books(payload);
	bookObj.save(function(err, result){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send("new book saved");
		}
	})
}

exports.updateBook = function(req, res, next){
	var payload = req.body;
	var globalbookid = payload.globalbookid;
	var title = payload.title;
	var authors = payload.authors.split(',');
	var ebookisbn10 = payload.ebookisbn10;
	var ebookisbn13 = payload.ebookisbn13;
	var printisbn10 = payload.printisbn10;
	var printisbn13 = payload.printisbn13;
	var librarysupported = payload.librarysupported;
	var editiontype = payload.editiontype;
	var previewlink = payload.previewlink;
	books.update({
		_id:payload._id
	},{
		$set:{
			globalbookid : globalbookid,
			title:title,
			authors:authors,
			ebookisbn10:ebookisbn10,
			ebookisbn13:ebookisbn13,
			printisbn10:printisbn10,
			librarysupported :librarysupported,
			editiontype :editiontype,
			previewlink :previewlink
		}
	}).exec(function(err, result){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send(" book updated");
		}
	})
}

exports.getAllBooks = function(req, res, next){
	books.find({},function(err, result){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send(result);
		}
	})
}

exports.removeBook = function(req, res, next){
	var payload = req.body;
	books.remove({_id:payload._id})
	.exec(function(err, result){
		if(err){
			res.status(500).send(err);
		}else{
			var payload = req.body;
			users.update({
				booksAssigned:{
					$in:[payload._id]
				}
			},{
				$pull:{
				    booksAssigned: payload._id
				}
			})
			.exec(function(err, result){
				if(err){
					res.status(500).send(err);
				}else{
			        res.status(200).send(" book deleted");
				}
			})
		}
	})
}



exports.unAssignedCustomers = function(req, res, next){
	var payload = req.body;
	users.find({
		admin_enabled:false,
		booksAssigned:{
			$nin:[payload._id]
		}
	})
	.exec(function(err, result){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send(result);
		}
	})
}

exports.assignedCustomers = function(req, res, next){
	var payload = req.body;
	users.find({
		admin_enabled:false,
		booksAssigned:{
			$in:[payload._id]
		}
	})
	.exec(function(err, result){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send(result);
		}
	})
}

exports.getCustomerBooks = function(req, res, next){
	var payload = req.user.booksAssigned;
	var booksDet = [];
	//console.log("in getCustomerBooks==>>",payload);
	
	if(req.user && req.user.booksAssigned && req.user.booksAssigned.length>0){
		//console.log("in getCustomerBooks==>>",payload, req.user.booksAssigned);
		async.each(payload,function(id, callBack){
			books.findOne({
				_id:id
			})
			.exec(function(err, bookDetail){
				if(err){
					callBack(err);
				}else{
					booksDet.push(bookDetail);
					callBack(null);
				}
			})
		},function(error, final){
			if(error){
		        res.status(500).send(err);
			}else{
				//console.log("booksdetails", booksDet);
				res.status(200).send(booksDet);
			}
		})
	}else{
		res.status(200).send(booksDet);
	}
}

exports.removeCustomerBook = function(req, res, next){
	var payload = req.body;
	users.update({
		_id:payload.userid
	},{
		$pull:{
		    booksAssigned: payload.bookToBeRemoved
		}
	})
	.exec(function(err, result){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send("book removed from customer account");
		}
	})
}


exports.addBookToCustomer = function(req, res, next){
	var payload = req.body;
	console.log("book to be added id", payload.bookToBeAdded);
	users.update({
		_id:req.user._id
	},{
		$addToSet:{
		    booksAssigned: payload.bookToBeAdded
		}
	}).exec(function(err, result){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send("account updated");
		}
	})
}
exports.assignBookToCustomer = function(req, res, next){
	var payload = req.body;
	console.log("book to be added id", payload.bookToBeAdded);
	users.update({
		_id:payload.userid
	},{
		$push:{
		    booksAssigned: payload.bookToBeAdded
		}
	}).exec(function(err, result){
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send("account updated");
		}
	})
}
