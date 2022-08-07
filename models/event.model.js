const { model, Schema } = require("mongoose");

const EventSchema = new Schema({
	title: { type: String, required: true },
	notes: { type: String },
	start: { type: Date, required: true },
	end: { type: Date, required: true },
	user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
});

EventSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject();

	object.id = _id;

	return object;
});

module.exports = model("event", EventSchema, "events");
