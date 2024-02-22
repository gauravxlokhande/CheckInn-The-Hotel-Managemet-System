public without sharing class CheckInn {

    @AuraEnabled 
   public static String createAccountAndContact(String firstName, String lastName, String email, String Password, Id ProfileId) {
     
            Account acc = new Account();
            acc.Name = firstName + ' ' + lastName;
            acc.Email__c = email;
            //acc.Phone =Phone;
            insert acc;

            Contact con = new Contact();
               con.AccountId = acc.Id;
               con.FirstName = firstName;
               con.LastName = lastName;
               con.Email = email;
             //  con.Phone =Phone;
               insert con;
           
           
           User user = new User();
               user.Username = email;
               user.ContactId = con.Id;
               user.LastName = lastName;
               user.FirstName = firstName;
               user.Email = email;
               user.Alias = 'U-' + String.valueOf(Crypto.getRandomInteger()).substring(0, 6);
               user.CommunityNickname = email;
               user.TimeZoneSidKey = 'GMT';
               user.LocaleSidKey = 'en_US';
               user.EmailEncodingKey = 'UTF-8';
           //   Profile desiredProfile = [SELECT Id FROM Profile WHERE Name = 'CheckInn Authenticate User Profile' LIMIT 1];
               user.ProfileId = ProfileId; //desiredProfile.Id;
               user.LanguageLocaleKey = 'en_US';
               user.IsActive = true;
             // user.ManagerId='2F0055j00000874WS';
           insert user;
          
           System.setpassword(user.Id,Password);
           
          // site.login(user.Username,Password,'/sms/s');
       return 'user created successfully';
         
   }
   
   
   // to show whole hotel data
   @AuraEnabled
   Public static List<Hotel__c> FetchAllHotels(){
      List<Hotel__c> StoreHotelDetails =[Select Name,Total_Rooms__c,Phone__c,Occupied_Rooms__c,Hotel_Image__c,Email__c,Description__c,Available_Rooms__c,Address__c FROM Hotel__c ];
       return StoreHotelDetails;
   }
   
   
   //to Show all Available rooms data
   @AuraEnabled
   public static List<Room__c> fetchAvaliableRooms(){
       List<Room__c> AvailableRooms =[Select Id,Name, Room_Type__c, Status__c,Room_Image__c,Rate__c,Hotel__r.Name from Room__c where Status__c='Available' ];
       return AvailableRooms;
   }
  
   
   // fetch room rent from room id
   @AuraEnabled
   public static Double gaveroomrent(String roomId){
       Room__c roomrent =[Select Id, Rate__c From Room__c Where Id=:roomId];
       System.debug(roomrent.Rate__c);
       return roomrent.Rate__c;
   }
   
  
   // Create Reservation of room
   @AuraEnabled
   public static String CreateBooking( String FirstName, String LastName, double TotalMembers, datetime Checkindatetime,datetime checkoutdatetime , Integer totalpayableamount, String RoomName ){
       
       String UserEmail = UserInfo.getUserEmail();
       Account userAccount  =[Select Id, Name,Email__c From Account Where Email__c=:UserEmail];
       
       Contact con =new Contact();
       con.AccountId =userAccount.Id;
       con.FirstName =FirstName;
       con.LastName=LastName;
       con.Room__c =RoomName;
       con.Email=userAccount.Email__c;
       con.Total_Guest__c=TotalMembers;
       con.Check_In_Date__c=Checkindatetime;
       con.Check_Out_Date__c=checkoutdatetime;
       con.Room_Status__c='Pending';
       con.Total_Payable_Amount__c=totalpayableamount;
       insert con;
       system.debug(con);
       return 'Room Booked Successfully';
   }
   
   
   // Fetch Reservations of current user
   @AuraEnabled
   public static List<Contact> allReservations(){
           String UserEmail = UserInfo.getUserEmail();
       List<Contact> ReservationList =[Select Id, Name,Email,Check_In_Date__c,Check_Out_Date__c,Room__r.Name,Room_Status__c,Reservation_Number__c,Total_Guest__c,Total_Payable_Amount__c From Contact where Room__c != null AND Email =:UserEmail ];
       return ReservationList;
   }
   
   
   @AuraEnabled
  public static void InsertServiceRequest(String ServiceText){
   String UserEmail = UserInfo.getUserEmail();
   
   Account acc = [SELECT Id, Name, Email__c, (SELECT Id, Name,Email, Room__c FROM Contacts WHERE Room__c != null) FROM Account WHERE Email__c = :UserEmail LIMIT 1];
   
   if (acc != null && !acc.Contacts.isEmpty()) {
       Contact firstContact = acc.Contacts[0];

       Service_Request__c servicereq = new Service_Request__c();
       servicereq.Guest__c = acc.Id;
       servicereq.Room__c = firstContact.Room__c;
       servicereq.Service_Request__c = ServiceText;
       servicereq.Email__c =acc.Email__c;
       insert servicereq;
   } else {
       System.debug('No matching Account or Contacts found for the given user email.');
   }
}
   
   @AuraEnabled
   Public static List<Service_Request__c> fetchServiceRequest(){
        String UserEmail = UserInfo.getUserEmail();
        List<Service_Request__c> ServiceRequests =[Select Id,Email__c,Guest__r.Name,Room__r.Name,Service_Request__c,Name,(Select Id,Name,Reply__c from Reply_ServiceRequests__r ORDER BY CreatedDate ASC) From Service_Request__c ORDER BY CreatedDate DESC];
       return ServiceRequests;
   }
   
   

}