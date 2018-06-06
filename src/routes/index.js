import {
  Dashboard,
  Person,
  LibraryBooks,
  LocationOn,
  Notifications,
  PhotoLibrary,
  Event,
} from "material-ui-icons";

const dashboardRoutes = ({ usingCRM, isOrganizer }) => {
  if (usingCRM && isOrganizer) {
    return [{
      path: "main",
      sidebarName: "Dashboard",
      navbarName: "Mesh-Network Dashboard",
      icon: Dashboard,
    }, {
      path: "updateSpace",
      sidebarName: "Space Information",
      navbarName: "Space Info",
      icon: LocationOn,
    }, {
      path: "updatePhotos",
      sidebarName: "Photo Gallery",
      navbarName: "Photos",
      icon: PhotoLibrary,
    }, {
      path: "editResources",
      sidebarName: "Resources",
      navbarName: "Resources",
      icon: LibraryBooks,
    },
    {
      path: "userManager",
      sidebarName: "Customer Management",
      navbarName: "Customer mgmt",
      icon: Person,
    }, {
      path: "userParticipation",
      sidebarName: "User Engagement",
      navbarName: "User Engagement",
      icon: Notifications,
    }, {
      path: "/addEvent",
      sidebarName: "Create Event",
      navbarName: "Create Event",
      icon: Event,
    }, {
      path: "reports",
      sidebarName: "Reports",
      navbarName: "Reports",
      icon: LibraryBooks,
    },
    ];
  } else if (usingCRM && !isOrganizer) {
    return [{
      path: "main",
      sidebarName: "Dashboard",
      navbarName: "Mesh-Network Dashboard",
      icon: Dashboard,
    }, {
      path: "updateSpace",
      sidebarName: "Space Information",
      navbarName: "Space Info",
      icon: LocationOn,
    }, {
      path: "updatePhotos",
      sidebarName: "Photo Gallery",
      navbarName: "Photos",
      icon: PhotoLibrary,
      // icon: ContentPaste,
    }, {
      path: "editResources",
      sidebarName: "Resources",
      navbarName: "Resources",
      icon: LibraryBooks,
    }, {
      path: "userManager",
      sidebarName: "Customer Management",
      navbarName: "Customer mgmt",
      icon: Person,
    }, {
      path: "userParticipation",
      sidebarName: "User Engagement",
      navbarName: "User Engagement",
      icon: Notifications,
    }, {
      path: "/addEvent",
      sidebarName: "Create Event",
      navbarName: "Create Event",
      icon: Event,
    }, {
      path: "/reports",
      sidebarName: "Reports",
      navbarName: "Reports",
      icon: LibraryBooks,
    },
    ];
  } else if (!usingCRM) {
    return [{
      path: "main",
      sidebarName: "Dashboard",
      navbarName: "Mesh-Network Dashboard",
      icon: Dashboard,
    }, {
      path: "updateSpace",
      sidebarName: "Space Information",
      navbarName: "Space Info",
      icon: LocationOn,
    }, {
      path: "updatePhotos",
      sidebarName: "Photo Gallery",
      navbarName: "Photos",
      icon: PhotoLibrary,
    }, {
      path: "editResources",
      sidebarName: "Resources",
      navbarName: "Resources",
      icon: LibraryBooks,
    },
    {
      path: "userParticipation",
      sidebarName: "User Engagement",
      navbarName: "User Engagement",
      icon: Notifications,
    }, {
      path: "/addEvent",
      sidebarName: "Create Event",
      navbarName: "Create Event",
      icon: Event,
    }, {
      path: "/reports",
      sidebarName: "Reports",
      navbarName: "Reports",
      icon: LibraryBooks,
    },
    ];
  }
}
export default dashboardRoutes; 
