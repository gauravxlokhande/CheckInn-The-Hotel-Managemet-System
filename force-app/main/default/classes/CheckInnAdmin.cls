public Without sharing class CheckInnAdmin {

    
    // to show whole hotel data
   @AuraEnabled
   Public static List<Hotel__c> FetchAllHotels(){
      List<Hotel__c> StoreHotelDetails =[Select Name,Total_Rooms__c,Phone__c,Occupied_Rooms__c,Hotel_Image__c,Email__c,Description__c,Available_Rooms__c,Address__c FROM Hotel__c ];
       return StoreHotelDetails;
   }
   
   @AuraEnabled
   Public static List<Service_Request__c> AllServiceRequests(){
       List<Service_Request__c> servicereq =[Select Id,Email__c,Guest__r.Name,Room__r.Name,Service_Request__c,Name,(Select Id,Name,Reply__c from Reply_ServiceRequests__r ORDER BY CreatedDate ASC) From Service_Request__c ORDER BY CreatedDate DESC];
       return servicereq;
   }
   
   @AuraEnabled
  public static void ReplyServiceReq(Id serviceRequestId, String replyText) {
           Reply_ServiceRequests__c reply = new Reply_ServiceRequests__c();
           reply.Service_Request__c = serviceRequestId;
           reply.Reply__c = replyText;
           insert reply;
           System.debug('Reply record created successfully with ID: ' + reply.Id);
      
   }
   
   @AuraEnabled
   Public Static List<Account> fetchAllCheckInnAcc(){
       List<Account> accList =[Select Id, Name,Email__c,CreatedBy.Name  From Account Where CreatedById =:'0055j000009SSprAAG' ];
       return accList;
   }
   
    @AuraEnabled
    Public Static List<Room__c> ShowAllRooms(){
        List<Room__c> RoomList = [Select Id, Name, Hotel__r.Name,Rate__c,Room_Image__c, Room_Type__c,Status__c From Room__c ORDER BY CreatedDate DESC ];
        return RoomList;
    }
   
}