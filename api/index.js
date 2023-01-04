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
const { loadDB } = require("../api/src/Controllers/utils.js");
require('dotenv').config();

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    loadDB();
    console.log("%s listening at ", process.env.PORT);
    // eslint-disable-line no-console
  });
});
