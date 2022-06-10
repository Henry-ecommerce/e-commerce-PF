const { DataTypes } = require("sequelize");

let Reviews = (sequelize) =>
	sequelize.define(
		"Review",
		{
			titulo: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			text: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			ratin: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					max: 5,
					min: 0,
				},
			},
		},
		{ timestamps: false }
	);

module.exports = Reviews;
