# PDF Viewer

This project allows you to view an invoice document generated using the `react-pdf` package. Using this package, a custom bill page is rendered and populated with data from a JSON response.

## JSON Response

Below is the sample JSON response used to generate the invoice:

```json
{
  "party": {
    "gstin": "09AMYPK1749C1ZO",
    "legal_name": "NEERAJ KUMAR",
    "trade_name": "M/S NEERAJ INDUSTRIES",
    "principal_address": {
      "address1": "PRATAP GANJ",
      "address2": "Kanpur Nagar",
      "pincode": "208022",
      "city": "Kanpur",
      "state": "UP",
      "country": "IN"
    },
    "shipping_address": {
      "address1": "E 83/A, Panki Site 5",
      "address2": "Kanpur Nagar",
      "pincode": "208022",
      "city": "Kanpur",
      "state": "UP",
      "country": "IN"
    }
  },
  "quantities": [801],
  "hsn_details": [
    {
      "hsn_code": 7801,
      "product_info": "UNWROUGHT LEAD",
      "cgst": "9",
      "sgst": "9",
      "unit": "Kgs",
      "taxableAmount": "137772.00",
      "totalTax": "24798.96",
      "totalAmount": "162570.96"
    }
  ],
  "rates": [172]
}

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.