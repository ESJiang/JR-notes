-- 创建table
CREATE TABLE
  lab2.Cars (
    cid INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255),
    color VARCHAR(255),
    TYPE VARCHAR(255),
    price INT,
    year INT,
    sold VARCHAR(255)
  );


-- 删除table
DROP TABLE
  lab2.Cars;


-- 修改table名(f2也行)
ALTER TABLE
  lab2.Cars RENAME TO Cars3 -- 添加一个Column
ALTER TABLE
  Cars
ADD
  COLUMN `工厂` VARCHAR(255) -- 删除一个column
ALTER TABLE
  Cars DROP COLUMN `工厂` -- 插入数据
INSERT INTO
  Cars(`款式`, `品牌`, `颜色`, `类型`, `价格`, `生产年份`, `是否卖出`)
VALUES
  ('Camaro', '雪佛兰', '黄色', '肌肉车', 65000, 2018, '1'),
  ('911', '保驰捷', '红色', '跑车', 20000, 2017, ''),
  ('Escape', '福特', '蓝色', 'SUV', 60000, 2020, '0'),
  ('M3', '特斯拉', '红色', '轿车', 250000, 2018, ''),
  (
    'Carrera',
    'Porsche',
    '红色',
    'sport car',
    240000,
    2013,
    ''
  ),
  ('Camaro', '雪佛兰', '红色', '肌肉车', 60000, 2016, '1'),
  ('Camaro', '雪佛兰', '黄色', '肌肉车', 65000, 2018, ''),
  ('Panamera', '保驰捷', '黑色', '跑车', 200000, 2017, '0'),
  ('Mustang', '福特', '蓝色', '肌肉车', 60000, 2020, ''),
  ('Model S', '特斯拉', '黑色', '轿车', 180000, 2018, '1'),
  ('Civic', 'Toyota', 'white', 'sedan', 25000, 2016, '0'),
  ('Camaro', '雪佛兰', '红色', '肌肉车', 60000, 2016, '0'),
  ('Challenger', '雪佛兰', 'Orange', '肌肉车', 70000, 2018, ''),
  ('911', '保驰捷', '红色', '跑车', 200000, 2017, '1'),
  ('Escape', '福特', '蓝色', 'SUV', 60000, 2020, ''),
  ('Model 3', '特斯拉', '红色', '轿车', 250000, 2018, '1'),
  ('Camaro', '雪佛兰', '红色', '肌肉车', 60000, 2016, '1'),
  ('120i', 'BMW', '白色', 'hatchpack', 40000, 2012, '');