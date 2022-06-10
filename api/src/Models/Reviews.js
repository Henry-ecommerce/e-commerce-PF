const { DataTypes } = require("sequelize");

let Reviews = (sequelize) =>
	sequelize.define(
		"Review",
		{
			text: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);

module.exports = Reviews;
