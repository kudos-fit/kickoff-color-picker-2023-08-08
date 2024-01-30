exports.up = function (knex) {
  return knex("palettes").insert([
    {
      color1: "rgb(255, 0, 0)",
      color2: "rgb(0, 255, 0)" ,
      color3: "rgb(0, 0, 255)" ,
      color4: "rgb(255, 255, 0)",
      color5: "rgb(255, 0, 255)"
    },
  ]);
};

exports.down = function (knex) {
  return knex("palettes").delete();
};
