import { useState, useRef, useEffect } from "react";

// ─── 데이터 ───────────────────────────────────────────────
const DAILY = [{"date":"2025-06-18","ta":17.74,"tn":16.9,"tx":18.6,"ha":63.03,"hn":61.7,"hx":64.9},{"date":"2025-06-19","ta":18.76,"tn":17.3,"tx":19.3,"ha":61.46,"hn":57.3,"hx":64.9},{"date":"2025-06-20","ta":17.62,"tn":17.1,"tx":17.9,"ha":63.11,"hn":61.3,"hx":64.7},{"date":"2025-06-21","ta":17.1,"tn":16.9,"tx":17.3,"ha":63.05,"hn":61.4,"hx":64.7},{"date":"2025-06-22","ta":17.42,"tn":17.1,"tx":17.6,"ha":62.12,"hn":58.1,"hx":64.5},{"date":"2025-06-23","ta":17.6,"tn":16.5,"tx":18.2,"ha":61.77,"hn":57.2,"hx":63.6},{"date":"2025-06-24","ta":16.71,"tn":16.1,"tx":17.0,"ha":62.08,"hn":61.0,"hx":63.5},{"date":"2025-06-25","ta":16.67,"tn":16.2,"tx":17.0,"ha":62.28,"hn":60.6,"hx":64.0},{"date":"2025-06-26","ta":17.32,"tn":16.4,"tx":18.4,"ha":62.86,"hn":60.8,"hx":64.7},{"date":"2025-06-27","ta":17.76,"tn":17.4,"tx":18.7,"ha":63.13,"hn":61.4,"hx":67.0},{"date":"2025-06-28","ta":17.3,"tn":17.2,"tx":17.5,"ha":64.82,"hn":62.8,"hx":65.8},{"date":"2025-06-29","ta":17.4,"tn":17.3,"tx":17.6,"ha":64.45,"hn":62.7,"hx":65.8},{"date":"2025-06-30","ta":17.52,"tn":17.1,"tx":18.5,"ha":63.32,"hn":61.7,"hx":66.0},{"date":"2025-07-01","ta":17.42,"tn":16.8,"tx":17.7,"ha":63.47,"hn":61.5,"hx":64.8},{"date":"2025-07-02","ta":18.13,"tn":17.0,"tx":19.6,"ha":63.06,"hn":61.6,"hx":64.7},{"date":"2025-07-03","ta":17.76,"tn":17.1,"tx":19.2,"ha":63.97,"hn":62.2,"hx":65.4},{"date":"2025-07-04","ta":19.42,"tn":18.2,"tx":21.9,"ha":62.98,"hn":58.5,"hx":66.4},{"date":"2025-07-05","ta":18.45,"tn":18.0,"tx":19.3,"ha":63.3,"hn":61.8,"hx":64.1},{"date":"2025-07-06","ta":19.04,"tn":18.5,"tx":19.4,"ha":62.64,"hn":61.8,"hx":63.6},{"date":"2025-07-07","ta":17.92,"tn":17.0,"tx":19.1,"ha":62.9,"hn":60.8,"hx":67.9},{"date":"2025-07-08","ta":17.65,"tn":17.1,"tx":18.0,"ha":63.98,"hn":62.2,"hx":67.2},{"date":"2025-07-09","ta":17.88,"tn":17.2,"tx":18.6,"ha":63.36,"hn":60.0,"hx":65.4},{"date":"2025-07-10","ta":18.08,"tn":17.1,"tx":18.4,"ha":62.75,"hn":58.2,"hx":66.4},{"date":"2025-07-11","ta":18.16,"tn":17.4,"tx":18.5,"ha":62.11,"hn":57.3,"hx":66.2},{"date":"2025-07-12","ta":17.45,"tn":16.8,"tx":17.8,"ha":65.42,"hn":62.0,"hx":66.5},{"date":"2025-07-13","ta":17.04,"tn":16.9,"tx":17.2,"ha":65.06,"hn":63.2,"hx":66.4},{"date":"2025-07-14","ta":17.16,"tn":16.8,"tx":17.5,"ha":64.02,"hn":62.3,"hx":65.1},{"date":"2025-07-15","ta":17.17,"tn":16.9,"tx":17.4,"ha":63.92,"hn":62.2,"hx":65.8},{"date":"2025-07-16","ta":17.04,"tn":16.6,"tx":17.5,"ha":63.9,"hn":61.9,"hx":66.1},{"date":"2025-07-17","ta":17.04,"tn":16.5,"tx":17.3,"ha":63.98,"hn":62.4,"hx":65.1},{"date":"2025-07-18","ta":17.06,"tn":16.5,"tx":17.3,"ha":64.32,"hn":62.1,"hx":66.9},{"date":"2025-07-19","ta":16.12,"tn":16.0,"tx":16.3,"ha":65.54,"hn":63.2,"hx":67.1},{"date":"2025-07-20","ta":16.06,"tn":15.9,"tx":16.2,"ha":66.16,"hn":64.7,"hx":68.8},{"date":"2025-07-21","ta":16.94,"tn":16.5,"tx":17.2,"ha":65.54,"hn":63.1,"hx":67.4},{"date":"2025-07-22","ta":17.02,"tn":16.5,"tx":17.4,"ha":64.82,"hn":62.6,"hx":66.5},{"date":"2025-07-23","ta":18.12,"tn":16.7,"tx":19.8,"ha":63.14,"hn":59.9,"hx":67.8},{"date":"2025-07-24","ta":19.68,"tn":17.9,"tx":20.6,"ha":61.1,"hn":58.5,"hx":67.1},{"date":"2025-07-25","ta":21.46,"tn":19.6,"tx":24.8,"ha":60.42,"hn":57.3,"hx":62.1},{"date":"2025-07-26","ta":23.64,"tn":23.1,"tx":24.0,"ha":61.71,"hn":60.8,"hx":62.6},{"date":"2025-07-27","ta":24.28,"tn":23.7,"tx":24.6,"ha":60.74,"hn":60.0,"hx":62.0},{"date":"2025-07-28","ta":21.27,"tn":18.1,"tx":26.3,"ha":59.68,"hn":55.6,"hx":65.8},{"date":"2025-07-29","ta":18.4,"tn":17.3,"tx":18.7,"ha":63.72,"hn":62.5,"hx":66.5},{"date":"2025-07-30","ta":18.64,"tn":17.1,"tx":19.5,"ha":63.79,"hn":58.7,"hx":67.1},{"date":"2025-07-31","ta":17.54,"tn":17.4,"tx":17.8,"ha":63.58,"hn":62.0,"hx":65.3},{"date":"2025-08-01","ta":17.91,"tn":17.3,"tx":19.5,"ha":64.16,"hn":62.3,"hx":67.8},{"date":"2025-08-02","ta":16.9,"tn":16.7,"tx":17.0,"ha":65.58,"hn":63.8,"hx":68.7},{"date":"2025-08-03","ta":16.97,"tn":16.8,"tx":17.1,"ha":65.12,"hn":64.2,"hx":66.6},{"date":"2025-08-04","ta":17.18,"tn":16.9,"tx":17.5,"ha":63.84,"hn":62.3,"hx":66.0},{"date":"2025-08-05","ta":17.02,"tn":16.6,"tx":17.6,"ha":65.52,"hn":63.5,"hx":68.1},{"date":"2025-08-06","ta":17.14,"tn":16.5,"tx":17.4,"ha":64.55,"hn":63.0,"hx":66.6},{"date":"2025-08-07","ta":17.24,"tn":16.8,"tx":17.5,"ha":64.98,"hn":63.1,"hx":67.0},{"date":"2025-08-08","ta":17.28,"tn":16.7,"tx":17.6,"ha":64.89,"hn":62.6,"hx":66.7},{"date":"2025-08-09","ta":16.24,"tn":16.1,"tx":16.3,"ha":65.83,"hn":63.9,"hx":67.9},{"date":"2025-08-10","ta":16.32,"tn":16.1,"tx":16.5,"ha":66.19,"hn":64.2,"hx":67.6},{"date":"2025-08-11","ta":17.27,"tn":16.6,"tx":17.5,"ha":64.27,"hn":62.2,"hx":66.0},{"date":"2025-08-12","ta":17.15,"tn":16.8,"tx":17.3,"ha":64.98,"hn":63.1,"hx":67.0},{"date":"2025-08-13","ta":16.26,"tn":16.2,"tx":16.4,"ha":65.67,"hn":64.0,"hx":67.1},{"date":"2025-08-14","ta":16.24,"tn":16.2,"tx":16.4,"ha":65.7,"hn":64.3,"hx":67.9},{"date":"2025-08-15","ta":16.29,"tn":16.1,"tx":16.4,"ha":66.24,"hn":64.0,"hx":68.0},{"date":"2025-08-16","ta":16.4,"tn":16.1,"tx":16.6,"ha":66.24,"hn":64.2,"hx":68.5},{"date":"2025-08-17","ta":16.44,"tn":16.1,"tx":16.7,"ha":66.46,"hn":64.6,"hx":68.1},{"date":"2025-08-18","ta":16.63,"tn":16.2,"tx":16.8,"ha":66.59,"hn":64.7,"hx":68.7},{"date":"2025-08-19","ta":17.1,"tn":16.6,"tx":17.4,"ha":65.44,"hn":63.1,"hx":67.7},{"date":"2025-08-20","ta":16.99,"tn":16.7,"tx":17.3,"ha":66.04,"hn":63.9,"hx":68.7},{"date":"2025-08-21","ta":17.11,"tn":16.9,"tx":17.6,"ha":65.76,"hn":63.4,"hx":67.9},{"date":"2025-08-22","ta":17.18,"tn":16.9,"tx":17.6,"ha":65.15,"hn":62.9,"hx":67.5},{"date":"2025-08-23","ta":16.46,"tn":16.2,"tx":16.6,"ha":66.46,"hn":65.1,"hx":68.4},{"date":"2025-08-24","ta":16.58,"tn":16.1,"tx":16.9,"ha":66.17,"hn":64.6,"hx":68.0},{"date":"2025-08-25","ta":18.03,"tn":17.1,"tx":22.5,"ha":65.85,"hn":58.4,"hx":91.4},{"date":"2025-08-26","ta":20.76,"tn":17.8,"tx":28.2,"ha":66.75,"hn":55.1,"hx":81.2},{"date":"2025-08-27","ta":18.89,"tn":17.9,"tx":25.3,"ha":63.94,"hn":55.0,"hx":74.8},{"date":"2025-08-28","ta":18.87,"tn":17.1,"tx":26.2,"ha":63.8,"hn":52.0,"hx":72.4},{"date":"2025-08-29","ta":17.27,"tn":16.9,"tx":17.5,"ha":65.47,"hn":62.8,"hx":68.1},{"date":"2025-08-30","ta":16.53,"tn":16.3,"tx":16.7,"ha":66.33,"hn":64.2,"hx":68.4},{"date":"2025-08-31","ta":16.66,"tn":16.2,"tx":16.9,"ha":66.91,"hn":64.9,"hx":68.6},{"date":"2025-09-01","ta":17.26,"tn":16.8,"tx":17.5,"ha":65.17,"hn":63.3,"hx":67.4},{"date":"2025-09-02","ta":17.26,"tn":16.7,"tx":17.5,"ha":65.62,"hn":63.5,"hx":67.7},{"date":"2025-09-03","ta":17.14,"tn":16.7,"tx":17.4,"ha":65.68,"hn":62.7,"hx":67.9},{"date":"2025-09-04","ta":17.27,"tn":16.8,"tx":18.8,"ha":64.82,"hn":62.6,"hx":66.5},{"date":"2025-09-05","ta":18.02,"tn":17.6,"tx":20.1,"ha":64.04,"hn":54.5,"hx":66.5},{"date":"2025-09-06","ta":22.7,"tn":16.9,"tx":27.1,"ha":74.98,"hn":54.8,"hx":89.9},{"date":"2025-09-07","ta":25.68,"tn":25.3,"tx":25.9,"ha":74.4,"hn":71.2,"hx":79.4},{"date":"2025-09-08","ta":18.62,"tn":17.6,"tx":20.3,"ha":62.59,"hn":51.6,"hx":65.5},{"date":"2025-09-09","ta":17.8,"tn":17.0,"tx":19.1,"ha":63.42,"hn":60.9,"hx":65.8},{"date":"2025-09-10","ta":18.27,"tn":17.8,"tx":20.5,"ha":61.23,"hn":50.6,"hx":67.5},{"date":"2025-09-11","ta":17.58,"tn":16.7,"tx":17.9,"ha":65.07,"hn":59.1,"hx":68.8},{"date":"2025-09-12","ta":16.69,"tn":16.5,"tx":16.8,"ha":66.95,"hn":65.4,"hx":68.6},{"date":"2025-09-13","ta":16.73,"tn":16.6,"tx":16.9,"ha":66.86,"hn":65.3,"hx":68.7},{"date":"2025-09-14","ta":16.66,"tn":16.5,"tx":16.8,"ha":67.59,"hn":65.5,"hx":69.7},{"date":"2025-09-15","ta":17.16,"tn":16.3,"tx":19.0,"ha":67.14,"hn":62.9,"hx":70.2},{"date":"2025-09-16","ta":17.21,"tn":16.6,"tx":19.2,"ha":65.55,"hn":54.3,"hx":68.4},{"date":"2025-09-17","ta":16.96,"tn":16.4,"tx":17.7,"ha":66.6,"hn":64.0,"hx":68.6},{"date":"2025-09-18","ta":16.62,"tn":16.2,"tx":17.3,"ha":67.79,"hn":64.6,"hx":69.8},{"date":"2025-09-19","ta":16.84,"tn":16.2,"tx":18.7,"ha":67.28,"hn":63.3,"hx":69.2},{"date":"2025-09-20","ta":16.45,"tn":16.3,"tx":16.6,"ha":67.46,"hn":65.1,"hx":69.5},{"date":"2025-09-21","ta":16.89,"tn":16.2,"tx":17.2,"ha":68.9,"hn":66.8,"hx":70.6},{"date":"2025-09-22","ta":16.89,"tn":16.5,"tx":17.3,"ha":67.04,"hn":59.8,"hx":69.4},{"date":"2025-09-23","ta":16.63,"tn":16.3,"tx":17.1,"ha":67.5,"hn":65.6,"hx":69.1},{"date":"2025-09-24","ta":16.78,"tn":16.3,"tx":17.6,"ha":66.54,"hn":63.7,"hx":68.7},{"date":"2025-09-25","ta":16.62,"tn":16.1,"tx":17.8,"ha":67.74,"hn":64.7,"hx":69.8},{"date":"2025-09-26","ta":16.95,"tn":16.4,"tx":18.6,"ha":67.86,"hn":63.8,"hx":69.8},{"date":"2025-09-27","ta":16.31,"tn":16.2,"tx":16.4,"ha":68.72,"hn":66.6,"hx":70.3},{"date":"2025-09-28","ta":16.27,"tn":16.2,"tx":16.4,"ha":68.19,"hn":65.8,"hx":69.8},{"date":"2025-09-29","ta":16.46,"tn":16.2,"tx":16.8,"ha":67.12,"hn":64.5,"hx":69.8},{"date":"2025-09-30","ta":16.54,"tn":16.0,"tx":17.0,"ha":66.8,"hn":64.3,"hx":68.6},{"date":"2025-10-01","ta":16.76,"tn":16.4,"tx":17.2,"ha":65.9,"hn":63.5,"hx":67.8},{"date":"2025-10-02","ta":17.72,"tn":16.4,"tx":19.8,"ha":61.7,"hn":54.4,"hx":71.4},{"date":"2025-10-03","ta":17.32,"tn":17.2,"tx":17.5,"ha":55.97,"hn":54.5,"hx":58.3},{"date":"2025-10-04","ta":17.34,"tn":17.2,"tx":17.4,"ha":56.5,"hn":54.4,"hx":58.3},{"date":"2025-10-05","ta":17.4,"tn":17.3,"tx":17.5,"ha":56.17,"hn":54.4,"hx":58.8},{"date":"2025-10-06","ta":19.99,"tn":17.7,"tx":21.1,"ha":61.11,"hn":53.2,"hx":65.8},{"date":"2025-10-07","ta":22.1,"tn":21.8,"tx":22.3,"ha":71.98,"hn":69.2,"hx":74.7},{"date":"2025-10-08","ta":23.28,"tn":22.7,"tx":23.6,"ha":68.4,"hn":64.4,"hx":71.6},{"date":"2025-10-09","ta":23.86,"tn":23.6,"tx":24.0,"ha":57.86,"hn":57.2,"hx":58.3},{"date":"2025-10-10","ta":23.8,"tn":23.8,"tx":23.8,"ha":61.2,"hn":58.5,"hx":63.2},{"date":"2025-10-11","ta":24.0,"tn":23.8,"tx":24.2,"ha":68.06,"hn":66.0,"hx":70.4},{"date":"2025-10-12","ta":24.13,"tn":24.1,"tx":24.2,"ha":65.1,"hn":61.9,"hx":66.8},{"date":"2025-10-13","ta":18.44,"tn":17.9,"tx":20.1,"ha":54.42,"hn":51.5,"hx":56.7},{"date":"2025-10-14","ta":18.15,"tn":17.8,"tx":18.4,"ha":55.92,"hn":53.6,"hx":58.5},{"date":"2025-10-15","ta":18.0,"tn":17.7,"tx":18.4,"ha":56.06,"hn":53.6,"hx":59.4},{"date":"2025-10-16","ta":17.98,"tn":17.6,"tx":18.5,"ha":57.15,"hn":55.3,"hx":59.7},{"date":"2025-10-17","ta":18.26,"tn":17.6,"tx":19.1,"ha":56.78,"hn":54.3,"hx":59.2},{"date":"2025-10-18","ta":17.88,"tn":17.8,"tx":18.0,"ha":56.92,"hn":55.1,"hx":58.0},{"date":"2025-10-19","ta":17.77,"tn":17.6,"tx":17.9,"ha":57.26,"hn":55.5,"hx":58.7},{"date":"2025-10-20","ta":19.22,"tn":18.8,"tx":19.5,"ha":49.87,"hn":47.3,"hx":53.5},{"date":"2025-10-21","ta":19.38,"tn":19.0,"tx":19.6,"ha":45.95,"hn":43.9,"hx":48.7},{"date":"2025-10-22","ta":18.99,"tn":16.5,"tx":19.6,"ha":51.48,"hn":47.8,"hx":56.8},{"date":"2025-10-23","ta":16.1,"tn":15.9,"tx":16.4,"ha":57.06,"hn":55.7,"hx":59.3},{"date":"2025-10-24","ta":16.11,"tn":15.8,"tx":16.9,"ha":57.86,"hn":55.7,"hx":59.7},{"date":"2025-10-25","ta":16.04,"tn":16.0,"tx":16.1,"ha":58.2,"hn":55.8,"hx":59.5},{"date":"2025-10-26","ta":16.43,"tn":15.9,"tx":16.9,"ha":56.77,"hn":52.6,"hx":59.5},{"date":"2025-10-27","ta":17.24,"tn":16.8,"tx":18.7,"ha":37.23,"hn":31.9,"hx":47.0},{"date":"2025-10-28","ta":17.51,"tn":17.2,"tx":17.7,"ha":40.45,"hn":33.1,"hx":51.4},{"date":"2025-10-29","ta":17.22,"tn":16.9,"tx":17.4,"ha":45.46,"hn":38.3,"hx":50.9},{"date":"2025-10-30","ta":17.2,"tn":17.0,"tx":17.5,"ha":48.94,"hn":46.4,"hx":53.0},{"date":"2025-10-31","ta":16.64,"tn":16.3,"tx":16.9,"ha":57.58,"hn":56.3,"hx":59.0},{"date":"2025-11-01","ta":17.2,"tn":16.6,"tx":17.6,"ha":53.58,"hn":48.8,"hx":57.8},{"date":"2025-11-02","ta":17.42,"tn":17.1,"tx":17.6,"ha":50.02,"hn":46.5,"hx":54.1},{"date":"2025-11-03","ta":17.26,"tn":16.8,"tx":18.9,"ha":38.99,"hn":36.2,"hx":46.2},{"date":"2025-11-04","ta":17.66,"tn":17.3,"tx":19.4,"ha":42.72,"hn":38.0,"hx":45.6},{"date":"2025-11-05","ta":17.49,"tn":17.1,"tx":18.0,"ha":44.8,"hn":40.3,"hx":50.2},{"date":"2025-11-06","ta":17.12,"tn":16.4,"tx":17.7,"ha":52.08,"hn":49.2,"hx":57.6},{"date":"2025-11-07","ta":16.69,"tn":16.1,"tx":17.1,"ha":55.64,"hn":51.1,"hx":58.8},{"date":"2025-11-08","ta":16.34,"tn":16.2,"tx":16.4,"ha":57.6,"hn":56.4,"hx":58.8},{"date":"2025-11-09","ta":16.76,"tn":16.1,"tx":17.4,"ha":54.24,"hn":50.0,"hx":58.7},{"date":"2025-11-10","ta":17.31,"tn":16.8,"tx":19.0,"ha":33.89,"hn":30.3,"hx":41.5},{"date":"2025-11-11","ta":17.7,"tn":17.4,"tx":19.3,"ha":44.84,"hn":40.7,"hx":49.2},{"date":"2025-11-12","ta":17.48,"tn":16.9,"tx":18.2,"ha":43.62,"hn":39.6,"hx":47.8},{"date":"2025-11-13","ta":17.34,"tn":16.9,"tx":17.8,"ha":47.68,"hn":42.6,"hx":52.0},{"date":"2025-11-14","ta":17.18,"tn":16.9,"tx":17.6,"ha":39.83,"hn":34.9,"hx":46.6},{"date":"2025-11-15","ta":16.98,"tn":16.9,"tx":17.1,"ha":42.74,"hn":40.3,"hx":45.8},{"date":"2025-11-16","ta":16.92,"tn":16.8,"tx":17.1,"ha":43.31,"hn":39.4,"hx":50.8},{"date":"2025-11-17","ta":17.63,"tn":16.9,"tx":19.0,"ha":34.99,"hn":30.6,"hx":42.3},{"date":"2025-11-18","ta":17.76,"tn":17.4,"tx":18.8,"ha":40.04,"hn":29.5,"hx":47.5},{"date":"2025-11-19","ta":17.71,"tn":17.2,"tx":18.1,"ha":36.34,"hn":28.1,"hx":46.4},{"date":"2025-11-20","ta":17.4,"tn":16.9,"tx":17.7,"ha":47.26,"hn":42.4,"hx":51.7},{"date":"2025-11-21","ta":17.26,"tn":16.9,"tx":17.9,"ha":43.94,"hn":39.8,"hx":50.7},{"date":"2025-11-22","ta":17.1,"tn":17.0,"tx":17.2,"ha":47.86,"hn":45.3,"hx":50.3},{"date":"2025-11-23","ta":17.04,"tn":16.9,"tx":17.2,"ha":50.64,"hn":48.8,"hx":52.4},{"date":"2025-11-24","ta":17.34,"tn":16.8,"tx":18.7,"ha":52.76,"hn":46.1,"hx":56.2},{"date":"2025-11-25","ta":17.71,"tn":17.5,"tx":18.8,"ha":45.51,"hn":42.6,"hx":49.1},{"date":"2025-11-26","ta":17.72,"tn":17.5,"tx":18.8,"ha":36.77,"hn":35.7,"hx":38.0},{"date":"2025-11-27","ta":17.76,"tn":17.5,"tx":19.0,"ha":40.58,"hn":33.8,"hx":43.9},{"date":"2025-11-28","ta":17.76,"tn":17.5,"tx":18.6,"ha":33.29,"hn":29.5,"hx":36.6},{"date":"2025-11-29","ta":18.01,"tn":17.8,"tx":18.2,"ha":22.76,"hn":21.1,"hx":26.2},{"date":"2025-11-30","ta":17.71,"tn":17.5,"tx":17.8,"ha":50.18,"hn":49.3,"hx":51.2},{"date":"2025-12-01","ta":17.92,"tn":17.1,"tx":19.1,"ha":36.67,"hn":35.1,"hx":37.7},{"date":"2026-03-03","ta":17.85,"tn":17.5,"tx":19.0,"ha":36.35,"hn":35.8,"hx":37.6},{"date":"2026-03-04","ta":18.05,"tn":17.7,"tx":20.0,"ha":37.4,"hn":26.6,"hx":40.2},{"date":"2026-03-05","ta":18.19,"tn":17.7,"tx":20.8,"ha":40.91,"hn":27.2,"hx":47.8},{"date":"2026-03-06","ta":18.44,"tn":17.0,"tx":25.7,"ha":38.79,"hn":37.7,"hx":41.7},{"date":"2026-03-07","ta":24.33,"tn":24.2,"tx":24.6,"ha":35.43,"hn":25.9,"hx":38.1}];

const MONTHLY = [
  {ym:"2025-06",label:"2025년 6월",ta:17.46,tn:16.1,tx:19.3,ha:62.88,hn:57.2,hx:67.0,n:260,t_oor:218,h_oor:248,
   issues:["온도: 전반적으로 18°C 미만 구간 다수 (평균 17.5°C)", "습도: 57~67%로 알람 상한(60%) 상시 근접·초과", "이탈 비율: 온도 83.8%, 습도 95.4% — 측정 초기부터 관리 기준 미충족 상태"]},
  {ym:"2025-07",label:"2025년 7월",ta:18.36,tn:15.9,tx:26.3,ha:63.39,hn:55.6,hx:68.8,n:620,t_oor:346,h_oor:580,
   issues:["온도: 7/25~28 급등 (최고 26.3°C, 알람 상한 초과)", "7/26~27 온도 23~24°C 지속 — 가장 긴 고온 지속 구간", "습도: 월 내내 60~69%로 알람 상한 초과 (93.5%)","온도 Min 15.9°C — 7/20 저온 이탈도 발생"]},
  {ym:"2025-08",label:"2025년 8월",ta:17.14,tn:16.1,tx:28.2,ha:65.51,hn:52.0,hx:91.4,n:620,t_oor:561,h_oor:611,
   issues:["⚠️ 최악 이벤트: 8/26 온도 28.2°C, 습도 91.4% 동시 최고점 기록", "8/25~28 연속 4일 고온·고습 이탈 — 전 기간 최대 이상구간", "온도 이탈 90.5%, 습도 이탈 98.5% — 전 월 중 최고 이탈률", "폭염 외부 영향 또는 공조 장애 의심"]},
  {ym:"2025-09",label:"2025년 9월",ta:17.51,tn:16.0,tx:27.1,ha:66.89,hn:50.6,hx:89.9,n:600,t_oor:511,h_oor:583,
   issues:["9/6~7 온도 25~27°C, 습도 75~90% 재차 급등", "9/7 온도 25.7°C — 이 달의 최고점", "습도 평균 66.9% — 전 기간 중 월평균 최고치", "온도 이탈 85.2%, 습도 이탈 97.2% — 8월에 이어 두 번째로 심각"]},
  {ym:"2025-10",label:"2025년 10월",ta:18.78,tn:15.8,tx:24.2,ha:56.49,hn:31.9,hx:74.7,n:620,t_oor:334,h_oor:139,
   issues:["10/7~12 온도 22~24°C 고온 지속 (6일 연속)", "10/27~28 습도 급락: 31.9~40% — 저습 이탈 시작", "습도 이탈 22.4%로 급감 — 건조 계절 전환 뚜렷", "온도는 여전히 이탈 53.9%, 관리 필요"]},
  {ym:"2025-11",label:"2025년 11월",ta:17.36,tn:16.1,tx:19.4,ha:44.28,hn:21.1,hx:58.8,n:600,t_oor:565,h_oor:0,
   issues:["습도: 전 측정값이 알람 상한(60%) 이하 — 습도 이탈 0건 달성", "11/29 습도 22.8% (Min 21.1%) — 전 기간 최저점", "온도: 18°C 미만 이탈 지속 (94.2%), 난방/공조 부족 의심", "습도 급락 추세 지속 — 저습 관리 대책 필요"]},
  {ym:"2025-12",label:"2025년 12월",ta:17.92,tn:17.1,tx:19.1,ha:36.67,hn:35.1,hx:37.7,n:4,
   issues:["측정 데이터 4건으로 참고치 수준 (12/1 일부만 포함)", "온도·습도 모두 낮은 수준 유지 (습도 35~38%)", "데이터 공백: 2025-12-02 ~ 2026-03-02 (약 3개월)"]},
  {ym:"2026-03",label:"2026년 3월",ta:18.99,tn:17.0,tx:25.7,ha:38.05,hn:25.9,hx:47.8,n:44,
   issues:["3/7 온도 24.2~24.6°C 재상승 — 고온 이벤트 재현", "습도 25~48%로 저습 구간 지속", "3/4~5 습도 Min 26~27% — 저습 알람 필요 검토", "측정 기간 5일 (참고치), 추가 모니터링 권장"]},
];

const ALARM_T = [18, 26], ALARM_H = [5, 60];
const PAD = {top:28, right:64, bottom:52, left:58};
const T_MIN=10, T_MAX=32, H_MIN=0, H_MAX=100;

// ─── 메인 컴포넌트 ─────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("chart"); // "chart" | "monthly"
  const [tab, setTab]   = useState("both");
  const [hovered, setHovered] = useState(null);
  const [selMonth, setSelMonth] = useState(null);
  const canvasRef = useRef(null);

  // ── 차트 그리기 ──
  useEffect(() => {
    if (page !== "chart") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      const W = canvas.offsetWidth;
      canvas.width  = W * window.devicePixelRatio;
      canvas.height = 340 * window.devicePixelRatio;
      canvas.style.height = "340px";
      const ctx = canvas.getContext("2d");
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      const H = 340, n = DAILY.length;
      const cW = W - PAD.left - PAD.right, cH = H - PAD.top - PAD.bottom;
      const xS = i => PAD.left + (i/(n-1))*cW;
      const yT = v => PAD.top + cH - ((v-T_MIN)/(T_MAX-T_MIN))*cH;
      const yH = v => PAD.top + cH - ((v-H_MIN)/(H_MAX-H_MIN))*cH;
      ctx.clearRect(0,0,W,H);

      // Grid
      ctx.strokeStyle="#e8ecf0"; ctx.lineWidth=1;
      for(let g=0;g<=5;g++){const y=PAD.top+(g/5)*cH;ctx.beginPath();ctx.moveTo(PAD.left,y);ctx.lineTo(W-PAD.right,y);ctx.stroke();}

      // Gap region (2025-12-02 ~ 2026-03-02)
      const gapStart = DAILY.findIndex(d=>d.date==="2025-12-01");
      const gapEnd   = DAILY.findIndex(d=>d.date==="2026-03-03");
      if(gapStart>=0&&gapEnd>=0){
        const x1=xS(gapStart)+8, x2=xS(gapEnd)-8;
        ctx.fillStyle="rgba(200,210,220,0.18)";
        ctx.fillRect(x1,PAD.top,x2-x1,cH);
        ctx.fillStyle="#aab0bb"; ctx.font="9px Calibri,sans-serif"; ctx.textAlign="center";
        ctx.fillText("데이터 공백",( x1+x2)/2,PAD.top+cH/2);
        ctx.fillText("(약 3개월)",(x1+x2)/2,PAD.top+cH/2+12);
      }

      // Month separators
      DAILY.forEach((d,i)=>{
        if(d.date.slice(8)==="01"&&i>0){
          const x=xS(i);
          ctx.save(); ctx.strokeStyle="#c8d4e0"; ctx.lineWidth=1; ctx.setLineDash([4,4]);
          ctx.beginPath();ctx.moveTo(x,PAD.top);ctx.lineTo(x,H-PAD.bottom);ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle="#8899aa"; ctx.font="9px Calibri,sans-serif"; ctx.textAlign="center";
          ctx.fillText(d.date.slice(0,7),x,H-PAD.bottom+15);
          ctx.restore();
        }
      });
      // 2026-03 label
      if(gapEnd>=0){
        ctx.fillStyle="#8899aa"; ctx.font="9px Calibri,sans-serif"; ctx.textAlign="center";
        ctx.fillText("2026-03",xS(gapEnd)+(xS(DAILY.length-1)-xS(gapEnd))/2, H-PAD.bottom+15);
      }

      // Alarm zones
      if(tab!=="hum"){
        ctx.fillStyle="rgba(240,165,0,0.07)";
        ctx.fillRect(PAD.left,yT(26),cW,yT(18)-yT(26));
        [18,26].forEach(v=>{
          ctx.save();ctx.strokeStyle="rgba(240,165,0,0.75)";ctx.lineWidth=1.2;ctx.setLineDash([6,4]);
          ctx.beginPath();ctx.moveTo(PAD.left,yT(v));ctx.lineTo(W-PAD.right,yT(v));ctx.stroke();
          ctx.setLineDash([]);ctx.restore();
          ctx.fillStyle="rgba(190,120,0,0.9)";ctx.font="9px Calibri,sans-serif";ctx.textAlign="right";
          ctx.fillText(v+"°C",PAD.left-3,yT(v)+3);
        });
      }
      if(tab!=="temp"){
        ctx.fillStyle="rgba(100,130,210,0.07)";
        ctx.fillRect(PAD.left,yH(60),cW,yH(5)-yH(60));
        ctx.save();ctx.strokeStyle="rgba(100,130,210,0.75)";ctx.lineWidth=1.2;ctx.setLineDash([6,4]);
        ctx.beginPath();ctx.moveTo(PAD.left,yH(60));ctx.lineTo(W-PAD.right,yH(60));ctx.stroke();
        ctx.setLineDash([]);ctx.restore();
        ctx.fillStyle="rgba(70,90,180,0.9)";ctx.font="9px Calibri,sans-serif";ctx.textAlign="left";
        ctx.fillText("60%",W-PAD.right+4,yH(60)+3);
      }

      // Bands
      const band=(ys,mk,xk,col)=>{
        ctx.beginPath();
        DAILY.forEach((d,i)=>{i===0?ctx.moveTo(xS(i),ys(d[xk])):ctx.lineTo(xS(i),ys(d[xk]));});
        [...DAILY].reverse().forEach((d,i)=>ctx.lineTo(xS(n-1-i),ys(d[mk])));
        ctx.closePath();ctx.fillStyle=col;ctx.fill();
      };
      if(tab!=="hum") band(yT,"tn","tx","rgba(224,92,58,0.12)");
      if(tab!=="temp") band(yH,"hn","hx","rgba(58,123,213,0.09)");

      // Lines
      const line=(ys,key,col)=>{
        ctx.beginPath();ctx.strokeStyle=col;ctx.lineWidth=2.2;
        DAILY.forEach((d,i)=>{i===0?ctx.moveTo(xS(i),ys(d[key])):ctx.lineTo(xS(i),ys(d[key]));});
        ctx.stroke();
      };
      if(tab!=="hum") line(yT,"ta","#e05c3a");
      if(tab!=="temp") line(yH,"ha","#3a7bd5");

      // Hover
      if(hovered!==null&&hovered>=0&&hovered<n){
        const x=xS(hovered);
        ctx.save();ctx.strokeStyle="rgba(60,80,120,0.22)";ctx.lineWidth=1;ctx.setLineDash([4,3]);
        ctx.beginPath();ctx.moveTo(x,PAD.top);ctx.lineTo(x,H-PAD.bottom);ctx.stroke();
        ctx.setLineDash([]);ctx.restore();
        const d=DAILY[hovered];
        if(tab!=="hum"){ctx.beginPath();ctx.arc(x,yT(d.ta),4,0,Math.PI*2);ctx.fillStyle="#e05c3a";ctx.fill();}
        if(tab!=="temp"){ctx.beginPath();ctx.arc(x,yH(d.ha),4,0,Math.PI*2);ctx.fillStyle="#3a7bd5";ctx.fill();}
      }

      // Axis labels
      ctx.fillStyle="#666";ctx.font="10px Calibri,sans-serif";
      ctx.textAlign="right";
      for(let g=0;g<=5;g++){const v=T_MIN+(g/5)*(T_MAX-T_MIN);ctx.fillText(v.toFixed(0)+"°",PAD.left-5,PAD.top+(1-g/5)*cH+3);}
      ctx.textAlign="left";
      for(let g=0;g<=5;g++){const v=g/5*100;ctx.fillText(v.toFixed(0)+"%",W-PAD.right+5,PAD.top+(1-g/5)*cH+3);}
      ctx.save();ctx.translate(13,H/2);ctx.rotate(-Math.PI/2);ctx.textAlign="center";ctx.fillStyle="#e05c3a";ctx.font="11px Calibri,sans-serif";ctx.fillText("온도 (°C)",0,0);ctx.restore();
      ctx.save();ctx.translate(W-10,H/2);ctx.rotate(Math.PI/2);ctx.textAlign="center";ctx.fillStyle="#3a7bd5";ctx.font="11px Calibri,sans-serif";ctx.fillText("습도 (%RH)",0,0);ctx.restore();
    };
    draw();
    const ro=new ResizeObserver(draw);
    ro.observe(canvasRef.current);
    return ()=>ro.disconnect();
  },[page,tab,hovered]);

  const handleMouseMove = e=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const rect=canvas.getBoundingClientRect();
    const mx=e.clientX-rect.left;
    const cW=canvas.offsetWidth-PAD.left-PAD.right;
    const idx=Math.round(((mx-PAD.left)/cW)*(DAILY.length-1));
    setHovered(idx>=0&&idx<DAILY.length?idx:null);
  };

  const hd = hovered!==null?DAILY[hovered]:null;
  const tAlarm = hd&&(hd.ta<18||hd.ta>26);
  const hAlarm = hd&&(hd.ha>60);

  const totalN   = MONTHLY.reduce((s,m)=>s+m.n,0);
  const totalToor= MONTHLY.reduce((s,m)=>s+(m.t_oor||0),0);
  const totalHoor= MONTHLY.reduce((s,m)=>s+(m.h_oor||0),0);

  const sm = selMonth!==null ? MONTHLY[selMonth] : null;

  // ── RENDER ──
  return (
    <div style={{fontFamily:"'Calibri','Malgun Gothic',sans-serif",background:"#f0f3f7",minHeight:"100vh",padding:14}}>
      {/* Header */}
      <div style={{background:"#1e3a5f",color:"white",borderRadius:"8px 8px 0 0",padding:"13px 18px"}}>
        <div style={{fontWeight:700,fontSize:15}}>온습도 통합 모니터링 보고서 — GN25089 (클린룸1)</div>
        <div style={{fontSize:11,opacity:0.72,marginTop:3}}>
          통합 측정기간: 2025-06-18 ~ 2026-03-07 &nbsp;|&nbsp; <b style={{color:"#7ec8e3"}}>근무시간 09:00~19:00</b> &nbsp;|&nbsp; 파일: 2개 통합 (8,100건) &nbsp;|&nbsp; 장치: GN25089, 채널 2ch
        </div>
      </div>

      {/* 통계 카드 */}
      <div style={{display:"flex",gap:8,margin:"8px 0"}}>
        {[
          {label:"총 측정건수 (근무시간)",value:`${totalN.toLocaleString()}건`,sub:"파일 2개 통합 기준",color:"#1e3a5f"},
          {label:"온도 평균",value:"17.9 °C",sub:"Min 15.8 / Max 28.2°C",color:"#e05c3a"},
          {label:"습도 평균",value:"55.2 %RH",sub:"Min 21.1 / Max 91.4%",color:"#3a7bd5"},
          {label:"온도 이탈건",value:`${totalToor.toLocaleString()}건`,sub:`${(totalToor/totalN*100).toFixed(1)}% | 알람: 18~26°C`,color:"#f0a500",warn:true},
          {label:"습도 이탈건",value:`${totalHoor.toLocaleString()}건`,sub:`${(totalHoor/totalN*100).toFixed(1)}% | 알람: >60%RH`,color:"#9b59b6",warn:true},
        ].map(c=>(
          <div key={c.label} style={{flex:1,background:"white",borderRadius:7,padding:"9px 10px",borderLeft:`4px solid ${c.color}`,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
            <div style={{fontSize:9,color:"#888",marginBottom:2}}>{c.label}</div>
            <div style={{fontSize:16,fontWeight:700,color:"#1a2533"}}>{c.value}</div>
            <div style={{fontSize:9,color:"#aaa",marginTop:2}}>
              {c.sub} {c.warn&&<span style={{background:"#ffeaea",color:"#c0392b",border:"1px solid #f5c2c7",borderRadius:3,fontSize:8,padding:"1px 4px",marginLeft:2}}>초과</span>}
            </div>
          </div>
        ))}
      </div>

      {/* 페이지 탭 */}
      <div style={{display:"flex",gap:0,marginBottom:0}}>
        {[["chart","📈 추이 차트"],["monthly","📋 월별 특이점 분석"]].map(([k,l])=>(
          <button key={k} onClick={()=>setPage(k)} style={{
            padding:"7px 18px",border:"none",cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:600,
            background:page===k?"white":"#dce3ed",color:page===k?"#1e3a5f":"#667",
            borderRadius:page===k?"6px 6px 0 0":"6px 6px 0 0",
            borderBottom:page===k?"3px solid #1e3a5f":"3px solid transparent",
            marginRight:4
          }}>{l}</button>
        ))}
      </div>

      {/* ─── 차트 패널 ─── */}
      {page==="chart" && (
        <div style={{background:"white",borderRadius:"0 8px 8px 8px",padding:"12px 14px 10px",boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
          <div style={{display:"flex",gap:6,marginBottom:10}}>
            {[["both","온도 + 습도"],["temp","온도만"],["hum","습도만"]].map(([k,l])=>(
              <button key={k} onClick={()=>setTab(k)} style={{
                padding:"4px 14px",borderRadius:20,border:"1px solid",cursor:"pointer",fontSize:11,fontFamily:"inherit",
                background:tab===k?"#1e3a5f":"white",color:tab===k?"white":"#555",borderColor:tab===k?"#1e3a5f":"#ddd"
              }}>{l}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:14,marginBottom:8,flexWrap:"wrap"}}>
            {tab!=="hum"&&<><Leg color="#e05c3a" label="온도 평균"/><Leg color="rgba(224,92,58,0.35)" label="온도 Min/Max 범위"/><Leg color="rgba(240,165,0,0.85)" dash label="온도 알람 (18/26°C)"/></>}
            {tab!=="temp"&&<><Leg color="#3a7bd5" label="습도 평균"/><Leg color="rgba(58,123,213,0.35)" label="습도 Min/Max 범위"/><Leg color="rgba(100,130,210,0.85)" dash label="습도 알람 (60%)"/></>}
          </div>
          {hd?(
            <div style={{display:"flex",gap:16,marginBottom:6,fontSize:11,color:"#334",background:"#f5f8fc",borderRadius:6,padding:"6px 12px",border:"1px solid #dde4f0"}}>
              <span style={{fontWeight:700}}>{hd.date}</span>
              {tab!=="hum"&&<span>🌡 온도: <b style={{color:tAlarm?"#c0392b":"#e05c3a"}}>{hd.ta.toFixed(1)}°C</b>{tAlarm?" ⚠️":""} <span style={{color:"#aaa"}}>({hd.tn}~{hd.tx}°C)</span></span>}
              {tab!=="temp"&&<span>💧 습도: <b style={{color:hAlarm?"#c0392b":"#3a7bd5"}}>{hd.ha.toFixed(1)}%</b>{hAlarm?" ⚠️":""} <span style={{color:"#aaa"}}>({hd.hn}~{hd.hx}%)</span></span>}
            </div>
          ):<div style={{height:28,marginBottom:6}}/>}
          <canvas ref={canvasRef} style={{width:"100%",display:"block",cursor:"crosshair"}}
            onMouseMove={handleMouseMove} onMouseLeave={()=>setHovered(null)}/>
          <div style={{marginTop:6,fontSize:9,color:"#aab0bb"}}>
            ※ 회색 음영 구간: 데이터 공백 (2025-12-02 ~ 2026-03-02, 약 3개월) &nbsp;|&nbsp; 세로 점선: 월 구분
          </div>
        </div>
      )}

      {/* ─── 월별 분석 패널 ─── */}
      {page==="monthly" && (
        <div style={{background:"white",borderRadius:"0 8px 8px 8px",boxShadow:"0 1px 3px rgba(0,0,0,0.08)",overflow:"hidden"}}>
          {/* 월 선택 버튼 */}
          <div style={{display:"flex",gap:0,background:"#f5f7fa",padding:"8px 12px",flexWrap:"wrap",gap:6}}>
            {MONTHLY.map((m,i)=>{
              const tPct=m.n>0?((m.t_oor||0)/m.n*100):0;
              const hPct=m.n>0?((m.h_oor||0)/m.n*100):0;
              const severity = (tPct>85||hPct>90)?2:(tPct>50||hPct>60)?1:0;
              const bgs=["#e8f4fd","#fff3cd","#fde8e8"];
              const bords=["#3a7bd5","#f0a500","#e05c3a"];
              return(
                <button key={m.ym} onClick={()=>setSelMonth(selMonth===i?null:i)} style={{
                  padding:"6px 12px",borderRadius:6,border:`2px solid ${selMonth===i?bords[severity]:"#ddd"}`,
                  cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:selMonth===i?700:400,
                  background:selMonth===i?bgs[severity]:"white",color:"#334",
                  boxShadow:selMonth===i?"0 2px 6px rgba(0,0,0,0.12)":"none"
                }}>
                  {m.label.slice(5)}
                  {severity===2&&<span style={{marginLeft:4,fontSize:9,color:"#c0392b"}}>●</span>}
                  {severity===1&&<span style={{marginLeft:4,fontSize:9,color:"#e67e22"}}>●</span>}
                </button>
              );
            })}
            <div style={{fontSize:9,color:"#aaa",alignSelf:"center",marginLeft:8}}>
              🔴 심각 &nbsp; 🟡 주의 &nbsp; 클릭하여 상세 보기
            </div>
          </div>

          {/* 월별 요약 테이블 */}
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead>
                <tr style={{background:"#1e3a5f",color:"white"}}>
                  {["월","측정건","온도 평균","온도 Min","온도 Max","습도 평균","습도 Min","습도 Max","온도이탈","온도이탈%","습도이탈","습도이탈%"].map(h=>(
                    <th key={h} style={{padding:"7px 10px",fontWeight:600,fontSize:10,whiteSpace:"nowrap",textAlign:"center"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MONTHLY.map((m,i)=>{
                  const tPct=m.n>0?((m.t_oor||0)/m.n*100):0;
                  const hPct=m.n>0?((m.h_oor||0)/m.n*100):0;
                  const sel=selMonth===i;
                  return(
                    <tr key={m.ym} onClick={()=>setSelMonth(selMonth===i?null:i)}
                      style={{background:sel?"#eef4ff":i%2===0?"#fafbfc":"white",cursor:"pointer",borderLeft:sel?"3px solid #1e3a5f":"3px solid transparent"}}>
                      <td style={{padding:"6px 10px",fontWeight:sel?700:400,color:"#1e3a5f",whiteSpace:"nowrap"}}>{m.label}</td>
                      <td style={{padding:"6px 10px",textAlign:"center"}}>{m.n}</td>
                      <td style={{padding:"6px 10px",textAlign:"center"}}>{m.ta}°C</td>
                      <td style={{padding:"6px 10px",textAlign:"center",color:"#3a7bd5"}}>{m.tn}°C</td>
                      <td style={{padding:"6px 10px",textAlign:"center",color:(m.tx>26?"#c0392b":"#e05c3a")}}>{m.tx}°C{m.tx>26?" ⚠️":""}</td>
                      <td style={{padding:"6px 10px",textAlign:"center"}}>{m.ha}%</td>
                      <td style={{padding:"6px 10px",textAlign:"center",color:"#9b59b6"}}>{m.hn}%{m.hn<30?" ⚠️":""}</td>
                      <td style={{padding:"6px 10px",textAlign:"center",color:(m.hx>60?"#c0392b":"#27ae60")}}>{m.hx}%{m.hx>60?" ⚠️":""}</td>
                      <td style={{padding:"6px 10px",textAlign:"center"}}>{(m.t_oor||0)}</td>
                      <td style={{padding:"6px 8px",textAlign:"center"}}>
                        <span style={{background:tPct>80?"#fde8e8":tPct>50?"#fff3cd":"#e8f8e8",color:tPct>80?"#c0392b":tPct>50?"#856404":"#27ae60",borderRadius:10,padding:"2px 7px",fontWeight:700,fontSize:10}}>
                          {tPct.toFixed(1)}%
                        </span>
                      </td>
                      <td style={{padding:"6px 10px",textAlign:"center"}}>{(m.h_oor||0)}</td>
                      <td style={{padding:"6px 8px",textAlign:"center"}}>
                        <span style={{background:hPct>80?"#fde8e8":hPct>30?"#fff3cd":"#e8f8e8",color:hPct>80?"#c0392b":hPct>30?"#856404":"#27ae60",borderRadius:10,padding:"2px 7px",fontWeight:700,fontSize:10}}>
                          {hPct.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 선택 월 상세 */}
          {sm && (
            <div style={{margin:"10px 12px 12px",padding:"12px 14px",background:"#f5f8fc",borderRadius:8,border:"1px solid #dde4f0"}}>
              <div style={{fontWeight:700,fontSize:13,color:"#1e3a5f",marginBottom:8}}>
                📌 {sm.label} 특이점 상세
              </div>
              <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
                {[
                  {l:"온도 범위",v:`${sm.tn} ~ ${sm.tx}°C (평균 ${sm.ta}°C)`,c:"#e05c3a"},
                  {l:"습도 범위",v:`${sm.hn} ~ ${sm.hx}% (평균 ${sm.ha}%)`,c:"#3a7bd5"},
                  {l:"온도 이탈",v:`${sm.t_oor||0}건 / ${sm.n}건`,c:"#f0a500"},
                  {l:"습도 이탈",v:`${sm.h_oor||0}건 / ${sm.n}건`,c:"#9b59b6"},
                ].map(x=>(
                  <div key={x.l} style={{flex:1,minWidth:120,background:"white",borderRadius:6,padding:"7px 10px",borderLeft:`3px solid ${x.c}`}}>
                    <div style={{fontSize:9,color:"#888"}}>{x.l}</div>
                    <div style={{fontSize:12,fontWeight:700,color:"#222",marginTop:2}}>{x.v}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,color:"#445",lineHeight:1.8}}>
                {sm.issues.map((s,i)=>(
                  <div key={i} style={{display:"flex",gap:6,marginBottom:3}}>
                    <span style={{color:"#1e3a5f",fontWeight:700,flexShrink:0}}>•</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{marginTop:8,fontSize:9,color:"#8899aa",lineHeight:1.6}}>
        ※ 근무시간(09:00~19:00) 기준 집계 &nbsp;|&nbsp; 알람 기준: 온도 18.0~26.0°C, 습도 5.0~60.0%RH &nbsp;|&nbsp;
        출처: 보고서_테이블25089.xls (2025-06~12) + 보고서_테이블_089.xlsx (2026-03) &nbsp;|&nbsp; v3.0
      </div>
    </div>
  );
}

function Leg({color,label,dash}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:"#555"}}>
      <div style={{width:18,height:3,background:dash?"none":color,borderTop:dash?`2px dashed ${color}`:"none",borderRadius:2}}/>
      {label}
    </div>
  );
}

