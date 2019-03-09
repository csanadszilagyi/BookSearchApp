# BookSearchApp

Simple book search application that fetches book metadata from the Google Books API using Angular 7 and Bootstrap 4. The data is displayed by the virtual scroll component from Angular CDK, making it performance friendly, in case of long lists as well.

# Usage
Clone and npm install.
In order to use it with unlimited api calls, you have to generate and give your api key (API_KEY is attached for each request sent to Google Books API). Once you have the key, you need to copy it to the "src/assets/config/app_config.json" file in the "googleBooksApiKey" field.

{
  "googleBooksApiKey": "..."
}

This application is only using the "list" functionality of the books api, so no Oauth 2 is needed at all.
