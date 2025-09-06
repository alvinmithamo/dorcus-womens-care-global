import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "@/components/LocationProvider";
import LocationSelector from "@/components/LocationSelector";
import GHLCalendar from "@/components/GHLCalendar";
import {
  Clock,
  MapPin,
  Phone,
  CreditCard,
  CheckCircle,
  Info,
  AlertTriangle,
} from "lucide-react";

const Appointments = () => {
  const { country, isLoading } = useLocation();

  const consultationTypes = {
    Kenya: [
      {
        type: "Initial Consultation",
        duration: "45 minutes",
        price: "KES 8,000",
        description: "Comprehensive health assessment and discussion of concerns",
        calendarEmbed:
          "https://api.leadconnectorhq.com/widget/groups/drmuchirike",
      },
      {
        type: "Follow-up Consultation",
        duration: "30 minutes",
        price: "KES 6,000",
        description: "Review of treatment progress and ongoing care",
        calendarEmbed:
          "https://api.leadconnectorhq.com/widget/groups/drmuchirike",
      },
      {
        type: "Fertility Consultation",
        duration: "60 minutes",
        price: "KES 12,000",
        description: "Specialized fertility assessment and treatment planning",
        calendarEmbed:
          "https://api.leadconnectorhq.com/widget/groups/drmuchirike",
      },
      {
        type: "Emergency Consultation",
        duration: "Variable",
        price: "KES 10,000",
        description:
          "Urgent gynecological concerns requiring immediate attention",
        calendarEmbed:
          "https://api.leadconnectorhq.com/widget/groups/drmuchirike",
      },
    ],
    UK: [
      {
        type: "Initial Consultation",
        duration: "45 minutes",
        price: "£180",
        description: "Comprehensive health assessment and discussion of concerns",
        calendarEmbed:
          "https://api.leadconnectorhq.com/widget/groups/drmuchiriuk",
      },
      {
        type: "Follow-up Consultation",
        duration: "30 minutes",
        price: "£120",
        description: "Review of treatment progress and ongoing care",
        calendarEmbed:
          "https://api.leadconnectorhq.com/widget/groups/drmuchiriuk",
      },
      {
        type: "Fertility Consultation",
        duration: "60 minutes",
        price: "£250",
        description: "Specialized fertility assessment and treatment planning",
        calendarEmbed:
          "https://api.leadconnectorhq.com/widget/groups/drmuchiriuk",
      },
      {
        type: "Emergency Consultation",
        duration: "Variable",
        price: "£200",
        description:
          "Urgent gynecological concerns requiring immediate attention",
        calendarEmbed:
          "https://api.leadconnectorhq.com/widget/groups/drmuchiriuk",
      },
    ],
  };

  const appointmentInfo = {
    Kenya: {
      location: "Nairobi Women's Hospital",
      address: "Adams Arcade, Ngong Road, Nairobi",
      phone: "+254 700 123 456",
      hours: "Mon–Fri: 8:00 AM – 6:00 PM\nSat: 9:00 AM – 2:00 PM",
      paymentMethods: [
        "Cash",
        "M-Pesa",
        "Bank Transfer",
        "Insurance (NHIF, Private)",
      ],
    },
    UK: {
      location: "London Women's Clinic",
      address: "123 Harley Street, London W1G 6BA",
      phone: "+44 20 7123 4567",
      hours: "Mon–Fri: 9:00 AM – 5:00 PM\nSat: 10:00 AM – 2:00 PM",
      paymentMethods: [
        "Credit/Debit Card",
        "Bank Transfer",
        "Private Insurance",
        "Self-Pay",
      ],
    },
  };

  const preparationTips = [
    "Bring a list of current medications and supplements",
    "Note down your questions and concerns beforehand",
    "Bring your medical history and previous test results",
    "Arrive 15 minutes early for registration",
    "Wear comfortable, loose-fitting clothing",
    "Bring a support person if desired",
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 lg:py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Loading appointment information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="heading-primary mb-6">
            Book Your <span className="text-medical-accent">Appointment</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Schedule your consultation with Dr. Dorcus for personalized women's
            health care. Choose your preferred location and find the appointment
            type that suits your needs.
          </p>
        </section>

        {/* Location Selection */}
        {!country && (
          <section className="mb-16">
            <LocationSelector />
          </section>
        )}

        {country && (
          <>
            {/* Consultation Types */}
            <section className="mb-16">
              <h2 className="heading-secondary text-center mb-12">
                Consultation Options – {country}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {consultationTypes[country].map((consultation, index) => (
                  <Card
                    key={index}
                    className="card-medical group hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <CardTitle className="text-xl">
                          {consultation.type}
                        </CardTitle>
                        <Badge variant="outline">
                          <Clock className="h-4 w-4 mr-1" />
                          {consultation.duration}
                        </Badge>
                      </div>
                      <CardDescription>
                        {consultation.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground">
                            Fee:
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-primary">
                          {consultation.price}
                        </span>
                      </div>

                      {/* GHL Calendar Embed */}
                      <GHLCalendar src={consultation.calendarEmbed} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Clinic Information */}
            <section className="mb-16">
              <h2 className="heading-secondary text-center mb-12">
                Clinic Information – {country}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-medical">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Location & Hours</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        {appointmentInfo[country].location}
                      </h4>
                      <p className="text-muted-foreground">
                        {appointmentInfo[country].address}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Operating Hours
                      </h4>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {appointmentInfo[country].hours}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Contact
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">
                          {appointmentInfo[country].phone}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-medical">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span>Payment Methods</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {appointmentInfo[country].paymentMethods.map(
                        (method, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <CheckCircle className="h-4 w-4 text-accent-green" />
                            <span className="text-muted-foreground">
                              {method}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                    <div className="mt-6 p-4 bg-accent-green-light rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-accent-green mt-0.5" />
                        <div>
                          <h5 className="font-medium text-foreground mb-1">
                            Payment Policy
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            Payment is required at the time of service. We
                            accept various payment methods for your convenience.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Preparation Tips */}
            <section className="mb-16">
              <Card className="card-medical bg-gradient-soft">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <span>Prepare for Your Visit</span>
                  </CardTitle>
                  <CardDescription>
                    Tips to help you make the most of your consultation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {preparationTips.map((tip, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="h-5 w-5 text-accent-green mt-1 shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Emergency Notice */}
            <section>
              <Card className="card-medical border-yellow-200 bg-yellow-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground mb-2">
                        Emergency Situations
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        For urgent medical concerns that cannot wait for a
                        scheduled appointment, please contact our emergency line
                        or visit the nearest emergency department.
                      </p>
                      <span className="text-sm font-medium text-foreground">
                        Emergency Contact: {appointmentInfo[country].phone}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Appointments;



















// import React from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { useLocation } from '@/components/LocationProvider';
// import LocationSelector from '@/components/LocationSelector';
// import GHLCalendar from '@/components/GHLCalendar';
// import { 
//   Calendar, 
//   Clock, 
//   MapPin, 
//   Phone, 
//   CreditCard,
//   CheckCircle,
//   Info,
//   AlertTriangle
// } from 'lucide-react';

// const Appointments = () => {
//   const { country, isLoading } = useLocation();

//   const consultationTypes = {
//     Kenya: [
//       {
//         type: "Initial Consultation",
//         duration: "45 minutes",
//         price: "KES 8,000",
//         description: "Comprehensive health assessment and discussion of concerns",
//         calendarEmbed: "https://api.leadconnectorhq.com/widget/groups/drmuchirike"
//       },
//       {
//         type: "Follow-up Consultation",
//         duration: "30 minutes", 
//         price: "KES 6,000",
//         description: "Review of treatment progress and ongoing care",
//         calendarEmbed: "https://api.leadconnectorhq.com/widget/groups/drmuchirike"
//       },
//       {
//         type: "Fertility Consultation",
//         duration: "60 minutes",
//         price: "KES 12,000",
//         description: "Specialized fertility assessment and treatment planning",
//         calendarEmbed: "https://api.leadconnectorhq.com/widget/groups/drmuchirike"
//       },
//       {
//         type: "Emergency Consultation",
//         duration: "Variable",
//         price: "KES 10,000",
//         description: "Urgent gynecological concerns requiring immediate attention",
//         calendarEmbed: "https://api.leadconnectorhq.com/widget/groups/drmuchirike"
//       }
//     ],
//     UK: [
//       {
//         type: "Initial Consultation",
//         duration: "45 minutes",
//         price: "£180",
//         description: "Comprehensive health assessment and discussion of concerns",
//         calendarEmbed: "https://api.leadconnectorhq.com/widget/groups/drmuchiriuk"
//       },
//       {
//         type: "Follow-up Consultation", 
//         duration: "30 minutes",
//         price: "£120",
//         description: "Review of treatment progress and ongoing care",
//         calendarEmbed: "https://api.leadconnectorhq.com/widget/groups/drmuchiriuk"
//       },
//       {
//         type: "Fertility Consultation",
//         duration: "60 minutes",
//         price: "£250",
//         description: "Specialized fertility assessment and treatment planning",
//         calendarEmbed: "https://api.leadconnectorhq.com/widget/groups/drmuchiriuk"
//       },
//       {
//         type: "Emergency Consultation",
//         duration: "Variable",
//         price: "£200",
//         description: "Urgent gynecological concerns requiring immediate attention",
//         calendarEmbed: "https://api.leadconnectorhq.com/widget/groups/drmuchiriuk"
//       }
//     ]
//   };

//   const appointmentInfo = {
//     Kenya: {
//       location: "Nairobi Women's Hospital",
//       address: "Adams Arcade, Ngong Road, Nairobi",
//       phone: "+254 700 123 456",
//       hours: "Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM",
//       paymentMethods: ["Cash", "M-Pesa", "Bank Transfer", "Insurance (NHIF, Private)"],
//       calendarEmbed: "https://api.leadconnectorhq.com/widget/groups/drmuchirike"
//     },
//     UK: {
//       location: "London Women's Clinic",
//       address: "123 Harley Street, London W1G 6BA",
//       phone: "+44 20 7123 4567", 
//       hours: "Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM",
//       paymentMethods: ["Credit/Debit Card", "Bank Transfer", "Private Insurance", "Self-Pay"],
//       calendarEmbed: "https://api.leadconnectorhq.com/widget/groups/drmuchiriuk"
//     }
//   };

//   const preparationTips = [
//     "Bring a list of current medications and supplements",
//     "Note down your questions and concerns beforehand",
//     "Bring your medical history and previous test results",
//     "Arrive 15 minutes early for registration",
//     "Wear comfortable, loose-fitting clothing",
//     "Bring a support person if desired"
//   ];

//   if (isLoading) {
//     return (
//       <div className="min-h-screen py-16 lg:py-24">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-center">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//               <p className="text-muted-foreground">Loading appointment information...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-16 lg:py-24">
//       <div className="container mx-auto px-4">
        
//         {/* Hero Section */}
//         <section className="text-center mb-16">
//           <h1 className="heading-primary mb-6">
//             Book Your <span className="text-medical-accent">Appointment</span>
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
//             Schedule your consultation with Dr. Dorcus for personalized women's health care. 
//             Choose your preferred location and find the appointment type that suits your needs.
//           </p>
//         </section>

//         {/* Location Selection */}
//         {!country && (
//           <section className="mb-16">
//             <LocationSelector />
//           </section>
//         )}

//         {country && (
//           <>
//             {/* Consultation Types */}
//             <section className="mb-16">
//               <h2 className="heading-secondary text-center mb-12">
//                 Consultation Options - {country}
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {consultationTypes[country].map((consultation, index) => (
//                   <Card key={index} className="card-medical group hover:shadow-lg transition-all duration-300">
//                     <CardHeader>
//                       <div className="flex items-center justify-between mb-4">
//                         <CardTitle className="text-xl">{consultation.type}</CardTitle>
//                         <Badge variant="outline">
//                           <Clock className="h-4 w-4 mr-1" />
//                           {consultation.duration}
//                         </Badge>
//                       </div>
//                       <CardDescription>{consultation.description}</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="flex items-center justify-between mb-6">
//                         <div className="flex items-center space-x-2">
//                           <CreditCard className="h-5 w-5 text-primary" />
//                           <span className="font-medium text-foreground">Fee:</span>
//                         </div>
//                         <span className="text-2xl font-bold text-primary">{consultation.price}</span>
//                       </div>
                      
//                       {/* Placeholder for GHL Calendar Embed */}

//                       <div className="calendar-wrapper">
//                         <iframe
//                           src={consultation.calendarEmbed}
//                           style={{ width: "100%", border: "none", overflow: "hidden" }}
//                           scrolling="no"
//                           height="700"
//                         ></iframe>
//                       </div>

//                       {/* <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
//                         <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
//                         <p className="text-muted-foreground mb-4">
//                           GoHighLevel Calendar Embed for {consultation.type}
//                         </p>
//                         <Button className="btn-medical">
//                           Schedule {consultation.type}
//                         </Button>
//                       </div> */}
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </section>

//             {/* Clinic Information */}
//             <section className="mb-16">
//               <h2 className="heading-secondary text-center mb-12">
//                 Clinic Information - {country}
//               </h2>
              
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <Card className="card-medical">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <MapPin className="h-5 w-5 text-primary" />
//                       <span>Location & Hours</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div>
//                       <h4 className="font-medium text-foreground mb-2">{appointmentInfo[country].location}</h4>
//                       <p className="text-muted-foreground">{appointmentInfo[country].address}</p>
//                     </div>
                    
//                     <div>
//                       <h4 className="font-medium text-foreground mb-2">Operating Hours</h4>
//                       <p className="text-muted-foreground whitespace-pre-line">{appointmentInfo[country].hours}</p>
//                     </div>
                    
//                     <div>
//                       <h4 className="font-medium text-foreground mb-2">Contact</h4>
//                       <div className="flex items-center space-x-2">
//                         <Phone className="h-4 w-4 text-primary" />
//                         <span className="text-muted-foreground">{appointmentInfo[country].phone}</span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card className="card-medical">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <CreditCard className="h-5 w-5 text-primary" />
//                       <span>Payment Methods</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-3">
//                       {appointmentInfo[country].paymentMethods.map((method, index) => (
//                         <div key={index} className="flex items-center space-x-3">
//                           <CheckCircle className="h-4 w-4 text-accent-green" />
//                           <span className="text-muted-foreground">{method}</span>
//                         </div>
//                       ))}
//                     </div>
                    
//                     <div className="mt-6 p-4 bg-accent-green-light rounded-lg">
//                       <div className="flex items-start space-x-3">
//                         <Info className="h-5 w-5 text-accent-green mt-0.5" />
//                         <div>
//                           <h5 className="font-medium text-foreground mb-1">Payment Policy</h5>
//                           <p className="text-sm text-muted-foreground">
//                             Payment is required at the time of service. We accept various payment methods for your convenience.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </section>

//             {/* Preparation Tips */}
//             <section className="mb-16">
//               <Card className="card-medical bg-gradient-soft">
//                 <CardHeader className="text-center">
//                   <CardTitle className="flex items-center justify-center space-x-2">
//                     <CheckCircle className="h-6 w-6 text-primary" />
//                     <span>Prepare for Your Visit</span>
//                   </CardTitle>
//                   <CardDescription>
//                     Tips to help you make the most of your consultation
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {preparationTips.map((tip, index) => (
//                       <div key={index} className="flex items-start space-x-3">
//                         <CheckCircle className="h-5 w-5 text-accent-green mt-1 shrink-0" />
//                         <span className="text-muted-foreground">{tip}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </section>

//             {/* Emergency Notice */}
//             <section>
//               <Card className="card-medical border-yellow-200 bg-yellow-50/50">
//                 <CardContent className="pt-6">
//                   <div className="flex items-start space-x-4">
//                     <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 shrink-0" />
//                     <div>
//                       <h3 className="font-medium text-foreground mb-2">Emergency Situations</h3>
//                       <p className="text-muted-foreground mb-4">
//                         For urgent medical concerns that cannot wait for a scheduled appointment, 
//                         please contact our emergency line or visit the nearest emergency department.
//                       </p>
//                       <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
//                         <span className="text-sm font-medium text-foreground">
//                           Emergency Contact: {appointmentInfo[country].phone}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </section>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Appointments;