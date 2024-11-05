const app = require('./app');
const PORT = process.env.PORT || 4000;
require('dotenv').config();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
