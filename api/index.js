   // be the change you want to see in the world                                                                                              
                                                                                                    
   //    . # %/*##,#(,##%,                 (*.       (.,                        
   //    #%#      /*.#*( (%( ##%%%%%%%.    #.(            ,#%%  .   ###%#.%(%%##             
   // *###%%%#(#* .#% #/(##    %%%%%%#             ,   .*#%%%%%%%%%%%%%%%#%%%%#              
   // *#%%%%%%%%%%%%#%#%#% #%   #%%%#(         .      , %*%%%%%%%%%%%%%%%%%%##%(              
   // ..   ###%%%#%%%% *  #%  .%%   ,/*     %###( %%%#%%%#%%%#%%%#%%%#%%#    #               
   //       %%%%%%%%#.  (#/#              ,##,,.%%%%%%%%%#%%%%%%%%%%%%%%%%,                  
   //       (%%%%%%%%%##%%#%#          #*/.#%#%%%%%%%%%%%#%%%%%%%%%%%%%%%# .                 
   //       %%%%%%%%%%%%%*,              %#%*##%,##%(,#%%#%%%%%%%%%%%#%%%  /                 
   //       %%%%%#%%%%#                /#   . ..%%#%##*%%#%%%%%%%#%%%%% . (                  
   //          #%#%/   #               , %%%%%%%%%%%#%%######%%%%%%%%%%%%, .                   
   //          ,%#,#  .(,            *%%%#%%%%%%%%% ##%%    %##  %%%                         
   //                *//(#%            #%%%%%%%%%%%%###       /    / .  , /                   
   //                #%#%#%##,              %#%#%#%#               # #%   ..                 
   //                   %%%#%%%%%%/            %%%%%%#                           /  .          
   //                   %#%%%%%%             %%%%%  ,%                  ##%%%#.              
   //                   %#%%%/                %%#                     %%%%%%%%%%             
   //                   ####                                               *%%#              
   //                   ##                                                  /.      %        
   //                   ,#                                                       #                                                                                                       

const server = require("./src/app.js");
const { conn } = require("./src/db.js");
//const { loadDB } = require("../api/src/Controllers/utils");
require('dotenv').config();

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    const loadDB = async () => {
      const apiUrl = await axios.get("https://restcountries.com/v3/all");
      const apiInfo = await apiUrl.data.map((e) => {
        return {
          name: e.name.common,
          id: e.cca3,
          flag: e.flags[0],
          continent: e.continents[0],
          capital: e.capital ? e.capital[0] : "no capital",
          subregion: e.subregion ? e.subregion : "no region",
          area: e.area,
          population: e.population,
        };
      });
      return Country.bulkCreate(apiInfo);
    };
    
    loadDB();
    console.log("%s listening at ", process.env.PORT);
    // eslint-disable-line no-console
  });
});
