function buildPatientTree(){
  require([
      'dojo/window',
      "dojo/store/Memory",
      "dijit/tree/ObjectStoreModel",
      "dijit/Tree",
      "dijit/tree/ForestStoreModel",
      "dojo/data/ItemFileReadStore",

      "dojo/dom",
      "dijit/registry",
      "dojo/dom-construct",
      "dojo/dom-style",
      "dojo/json",

      'dojox/fx/scroll',

      'dojo/query',
      'dojo/request',

      'aushadha/panes/demographics_tab',
      'aushadha/panes/family_history_tab',
      'aushadha/panes/medical_history_tab',
      'aushadha/panes/surgical_history_tab',
      'aushadha/panes/social_history_tab',
      'aushadha/panes/medication_list_tab',
      'aushadha/panes/immunisation_tab',      

      /*
      'aushadha/panes/obstetric_history_tab',
      'aushadha/panes/neonatal_and_paediatric_exam_tab',
      'aushadha/panes/gynaecology_history_tab',
      */

  ], 
  function(win,
          Memory, 
          ObjectStoreModel,
          Tree,
          ForestStoreModel,
          ItemFileReadStore,
          dom, 
          registry,
          domConstruct, 
          domStyle, 
          JSON,
          scroll,
          query,
          request,

          demographicsTab,
          familyHistoryTab,
          medicalHistoryTab,
          surgicalHistoryTab,
          socialHistoryTab,
          medicationListTab,
          immunisationTab
          ){

    // Create store 
    
//     request(CHOSEN_PATIENT.patientTreeUrl).
//       then(function(json){
//               console.log(json);
//           }, 
//           function(err){ 
//               console.log(err)
//           });
// 

    var patientTreeStore = new ItemFileReadStore({url: CHOSEN_PATIENT.patientTreeUrl,
                                                  clearOnClose:true,
                                                  heirarchial:false
    });
    console.log("Patient Tree Store is: ");
    console.log(patientTreeStore);

    // Create the model
    var patientTreeModel = new ForestStoreModel({store         : patientTreeStore,
                                                 query         : {type: 'application'},
                                                 rootId        : 'root',
                                                 rootLabel     : "Patient",
                                                 childrenAttrs : ["children"]
                                                });

    // Create the Tree.
    function setTreeIcons(item, opened){
      //console.log(item.tree.rootNode || "Not defined");
      if(item.id=='root'){
        console.log(item.id)
        console.log("Returning iconclass for tree root..")
        return 'patientIcon'
      }
      else{
        console.log(item.id)
        console.log("Returning iconclass for tree root..")
        return (opened ? "dijitFolderOpened" : "dijitFolderClosed")
      }
    }

    var demographicsUrlDict = {demographicsUrl   : CHOSEN_PATIENT.demographicsadd,
                                contactUrl        : CHOSEN_PATIENT.contactjson,
                                phoneUrl          : CHOSEN_PATIENT.phonejson,
                                guardianUrl       : CHOSEN_PATIENT.guardianjson
                              }

    console.log("Trying to build the Patient Tree");

    var patientTree = new Tree({
          model   : patientTreeModel,
          showRoot: false,
          startup : function(){
                        require(['dojo/dom',
                                'dijit/registry',
                                'dojo/dom-style',
                                'dojo/query',
                                'dojo/dom-construct',
                                'dijit/form/Button',
                                'dijit/Dialog',
                                'dijit/layout/BorderContainer',
                                'dojox/layout/ContentPane',
                                'dijit/layout/TabContainer',
                                'dojo/json','dojo/request'
                                ],
                        function(dom,registry,
                                  domStyle,query,
                                  domConstruct,
                                  Button, 
                                  Dialog,
                                  BorderContainer,
                                  ContentPane,
                                  TabContainer, 
                                  JSON,
                                  request
                                ){
                            request(CHOSEN_PATIENT.patientsummary).
                            then(
                              function(html){

                                var centerTopTabPane  = registry.byId("centerTopTabPane");

//                                 if(dom.byId('patientSynopsisContainer')){
//                                   dom.byId('patientSynopsisContainer').remove();
//                                 }
//                                 if(! dom.byId('patientSynopsisSynopsisContainer')){
//                                   domConstruct.create('div',
//                                                       {id: 'patientSynopsisContainer'},
//                                                       'patientSynopsisTopContentPane',
//                                                       'first');
//                                 }
                                registry.byId('patientSynopsisTopContentPane').set('content',html);

                                query('#patientSynopsisTopContentPane > div').
                                  forEach( function(node, index, nodeList){
                                    console.log("setting styles...")
                                    domStyle.set(node,
                                                {borderRadius : "2px",
                                                  background   : "white",
                                                  border       : "solid #ddd 1px",
                                                  minHeight    : " 10em",
                                                  margin       : "3px",
                                                  padding      : "10px"
                                                }
                                    );
                                  }
                                );

//                                 query('#patientSynopsisContainer > div :hover').
//                                   forEach( function(node, index, nodeList){
//                                     console.log("setting styles...")
//                                     domStyle.set(node,
//                                                 {
//                                                   background   : "#faf9ff",
//                                                 }
//                                     );
//                                   }
//                                 );

                              },
                              function(error){
                                  publishError("ERROR!: " + error);
                              }
                            );
                           }
                        )
          },
          onClick : function(item){

                      var allowed_items     = ['Visits','Admissions',"Investigations","Imaging"];
                      var centerTopTabPane  = registry.byId("centerTopTabPane");

                      function scrollToSynopsis(domId /* Id of the DOM */) {
                          /*
                          scroll({
                              node : query("#patientSynopsisTopContentPane #"+ domId),
                              win  : dom.byId('patientSynopsisTopContentPane')
                          }).play();
                          */
                          win.scrollIntoView(domId);
                      }

                      var treeItemDivMap={
                        'History'           : 'patientHistoryContainer',
                        'Medical History'   : 'patientMedicalHistoryContainer',
                        'Surgical History'  : 'patientSurgicalHistoryContainer',
                        'Family History'    : 'patientFamilyHistoryContainer',
                        'Social History'    : 'patientSocialHistoryContainer',
                        'Medications'       : 'patientMedicationsContainer',
                        'Immunisation'     : 'patientImmunisationContainer'
                      }

                      if ( treeItemDivMap[item.name]){
                          scrollToSynopsis(treeItemDivMap[item.name]);
                      }

                      /*
                      if (item.name == "Medical History" || 
                          item.type == 'medical_history_module'){
                          scrollToSynopsis('patientMedicalHistoryContainer');
                      }

                      if (item.name == "Surgical History" || 
                          item.type == 'surgical_history_module'){
                          scrollToSynopsis('patientSurgicalHistoryContainer');
                      }

                      if (item.name == "Demographics" || 
                          item.type == 'demographics_module'){
                          scrollToSynopsis('patientDemographicsContainer');
                      }

                      if (item.name == "Social History" || 
                          item.type == 'social_history_module'){
                          scrollToSynopsis('patientSocialHistoryContainer');
                      }

                      if (item.name == "Family History" || 
                          item.type == 'family_history_module'){
                          scrollToSynopsis('patientFamilyHistoryContainer');
                      }

                      if (item.name == "Medications" || 
                          item.type == 'medication_list_module'){
                          scrollToSynopsis('patientMedicationsContainer');
                      }
                      */


          },
          onDblClick: function(item,node,evt){
                        var contextTabs = registry.byId('patientContextTabs');
                        if(item.name =="Demographics" || item.type=="demographics_module"){
                                if(!registry.byId('contactAndDemographicsTab') ){
                                    console.log(CHOSEN_PATIENT);
                                    console.log(demographicsTab);
                                    demographicsTab.constructor(demographicsUrlDict);
                                }
                                else{
                                  registry.byId("patientContextTabs").selectChild(
                                    registry.byId("contactAndDemographicsTab")
                                  );
                                }
                        }

                        if(item.name =="Social History" || item.type=="social_history_module"){
                                if(!registry.byId('socialHistoryTab') ){
                                    console.log(CHOSEN_PATIENT);
                                    socialHistoryTab.constructor(CHOSEN_PATIENT.socialhistoryadd);
                                }
                                else{
                                  registry.byId("patientContextTabs").selectChild(
                                    registry.byId("socialHistoryTab")
                                  );
                                }
                        }

                        if(item.name =="Family History" || item.type=="family_history_module"){
                                if(!registry.byId('familyHistoryTab') ){
                                    console.log(CHOSEN_PATIENT);
                                    familyHistoryTab.constructor();
                                }
                                else{
                                  registry.byId("patientContextTabs").selectChild(
                                    registry.byId("familyHistoryTab")
                                  );
                                }
                        }

                        if(item.name =="Medical History" || item.type=="medical_history_module"){
                                if(!registry.byId('patientMedicalHistoryTab') ){
                                    console.log(CHOSEN_PATIENT);
                                    medicalHistoryTab.constructor();
                                }
                                else{
                                  registry.byId("patientContextTabs").selectChild(
                                    registry.byId("patientMedicalHistoryTab")
                                  );
                                }
                        }

                        if(item.name =="Surgical History" || item.type=="surgical_history_module"){
                                if(!registry.byId('patientSurgicalHistoryTab') ){
                                    console.log(CHOSEN_PATIENT);
                                    surgicalHistoryTab.constructor();
                                }
                                else{
                                  registry.byId("patientContextTabs").selectChild(
                                    registry.byId("patientSurgicalHistoryTab")
                                  );
                                }
                        }

                        if(item.name =="Medications" || item.module_type=="medication_list_module"){
                                if(!registry.byId('medicationListTab') ){
                                    console.log(CHOSEN_PATIENT);
                                    medicationListTab.constructor();
                                }
                                else{
                                  registry.byId("patientContextTabs").selectChild(
                                    registry.byId("medicationListTab")
                                  );
                                }
                        }

                        if(item.name =="Immunisation" || item.module_type=="immunisation_module"){
                                if(!registry.byId('immunisationTab') ){
                                    console.log(CHOSEN_PATIENT);
                                    immunisationTab.constructor();
                                }
                                else{
                                  registry.byId("patientContextTabs").selectChild(
                                    registry.byId("immunisationTab")
                                  );
                                }
                        }
//                             if(item.type == "family_history_module"   ||
//                                item.type == "medical_history_module"  || 
//                                item.type == "surgical_history_module" || 
//                                item.type == "social_history_module"
//                             ){
//                               //createHistoryTabs();
//                             }
          }
        },
        'patientTreeDiv');

        patientTree.getIconClass = setTreeIcons;
        console.log("Setting Tree icons complete");
        patientTree.startup();
        patientTree.expandAll();
        //patientTree.collapseAll();
    });
}