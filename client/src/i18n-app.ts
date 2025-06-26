import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_page from '../public/locales/en/page.json';
import ar_page from '../public/locales/ar/page.json';
import en_admin from '../public/locales/en/admin.json';
import ar_admin from '../public/locales/ar/admin.json';
import en_auth from '../public/locales/en/auth.json';
import ar_auth from '../public/locales/ar/auth.json';
import en_blog from '../public/locales/en/blog.json';
import ar_blog from '../public/locales/ar/blog.json';
import en_calculator from '../public/locales/en/calculator.json';
import ar_calculator from '../public/locales/ar/calculator.json';
import en_chatbot from '../public/locales/en/chatbot.json';
import ar_chatbot from '../public/locales/ar/chatbot.json';
import en_dashboard from '../public/locales/en/dashboard.json';
import ar_dashboard from '../public/locales/ar/dashboard.json';
import en_faq from '../public/locales/en/faq.json';
import ar_faq from '../public/locales/ar/faq.json';
import en_food_scanner from '../public/locales/en/food-scanner.json';
import ar_food_scanner from '../public/locales/ar/food-scanner.json';
import en_form from '../public/locales/en/form.json';
import ar_form from '../public/locales/ar/form.json';
import en_forum from '../public/locales/en/forum.json';
import ar_forum from '../public/locales/ar/forum.json';
import en_grocery_list from '../public/locales/en/grocery-list.json';
import ar_grocery_list from '../public/locales/ar/grocery-list.json';
import en_habits from '../public/locales/en/habits.json';
import ar_habits from '../public/locales/ar/habits.json';
import en_plans from '../public/locales/en/plans.json';
import ar_plans from '../public/locales/ar/plans.json';
import en_profile from '../public/locales/en/profile.json';
import ar_profile from '../public/locales/ar/profile.json';
import en_recipes from '../public/locales/en/recipes.json';
import ar_recipes from '../public/locales/ar/recipes.json';
import en_settings from '../public/locales/en/settings.json';
import ar_settings from '../public/locales/ar/settings.json';
import en_testimonials from '../public/locales/en/testimonials.json';
import ar_testimonials from '../public/locales/ar/testimonials.json';
import en_tracker from '../public/locales/en/tracker.json';
import ar_tracker from '../public/locales/ar/tracker.json';
import en_notifications from '../public/locales/en/notifications.json';
import ar_notifications from '../public/locales/ar/notifications.json';
import en_notifications_dropdown from '../public/locales/en/notifications-dropdown.json';
import ar_notifications_dropdown from '../public/locales/ar/notifications-dropdown.json';
import en_footer from '../public/locales/en/footer.json';
import ar_footer from '../public/locales/ar/footer.json';
import en_navbar from '../public/locales/en/navbar.json';
import ar_navbar from '../public/locales/ar/navbar.json';
import en_sidebar from '../public/locales/en/sidebar.json';
import ar_sidebar from '../public/locales/ar/sidebar.json';
// import en_social_hub from '../public/locales/en/social-hub.json';
// import ar_social_hub from '../public/locales/ar/social-hub.json';
// import en_social_hub_notifications from '../public/locales/en/social-hub-notifications.json';
// import ar_social_hub_notifications from '../public/locales/ar/social-hub-notifications.json';
// import en_social_hub_leaderboard from '../public/locales/en/social-hub-leaderboard.json';
// import ar_social_hub_leaderboard from '../public/locales/ar/social-hub-leaderboard.json';
// import en_social_hub_settings from '../public/locales/en/social-hub-settings.json';
// import ar_social_hub_settings from '../public/locales/ar/social-hub-settings.json';
// import en_social_hub_explore from '../public/locales/en/social-hub-explore.json';
// import ar_social_hub_explore from '../public/locales/ar/social-hub-explore.json';
// import en_social_hub_events from '../public/locales/en/social-hub-events.json';
// import ar_social_hub_events from '../public/locales/ar/social-hub-events.json';
// import en_social_hub_groups from '../public/locales/en/social-hub-groups.json';
// import ar_social_hub_groups from '../public/locales/ar/social-hub-groups.json';
// import en_social_hub_messages from '../public/locales/en/social-hub-messages.json';
// import ar_social_hub_messages from '../public/locales/ar/social-hub-messages.json';
// import en_social_hub_profile from '../public/locales/en/social-hub-profile.json';
// import ar_social_hub_profile from '../public/locales/ar/social-hub-profile.json';
// import en_social_hub_profile_username from '../public/locales/en/social-hub-profile-username.json';
// import ar_social_hub_profile_username from '../public/locales/ar/social-hub-profile-username.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        page: en_page,
        admin: en_admin,
        auth: en_auth,
        blog: en_blog,
        calculator: en_calculator,
        chatbot: en_chatbot,
        dashboard: en_dashboard,
        faq: en_faq,
        'food-scanner': en_food_scanner,
        form: en_form,
        forum: en_forum,
        'grocery-list': en_grocery_list,
        habits: en_habits,
        plans: en_plans,
        profile: en_profile,
        recipes: en_recipes,
        settings: en_settings,
        testimonials: en_testimonials,
        tracker: en_tracker,
        notifications: en_notifications,
        'notifications-dropdown': en_notifications_dropdown,
        footer: en_footer,
        navbar: en_navbar,
        sidebar: en_sidebar,
        // 'social-hub': en_social_hub,
        // 'social-hub-notifications': en_social_hub_notifications,
        // 'social-hub-leaderboard': en_social_hub_leaderboard,
        // 'social-hub-settings': en_social_hub_settings,
        // 'social-hub-explore': en_social_hub_explore,
        // 'social-hub-events': en_social_hub_events,
        // 'social-hub-groups': en_social_hub_groups,
        // 'social-hub-messages': en_social_hub_messages,
        // 'social-hub-profile': en_social_hub_profile,
        // 'social-hub-profile-username': en_social_hub_profile_username,
      },
      ar: {
        page: ar_page,
        admin: ar_admin,
        auth: ar_auth,
        blog: ar_blog,
        calculator: ar_calculator,
        chatbot: ar_chatbot,
        dashboard: ar_dashboard,
        faq: ar_faq,
        'food-scanner': ar_food_scanner,
        form: ar_form,
        forum: ar_forum,
        'grocery-list': ar_grocery_list,
        habits: ar_habits,
        plans: ar_plans,
        profile: ar_profile,
        recipes: ar_recipes,
        settings: ar_settings,
        testimonials: ar_testimonials,
        tracker: ar_tracker,
        notifications: ar_notifications,
        'notifications-dropdown': ar_notifications_dropdown,
        footer: ar_footer,
        navbar: ar_navbar,
        sidebar: ar_sidebar,
        // 'social-hub': ar_social_hub,
        // 'social-hub-notifications': ar_social_hub_notifications,
        // 'social-hub-leaderboard': ar_social_hub_leaderboard,
        // 'social-hub-settings': ar_social_hub_settings,
        // 'social-hub-explore': ar_social_hub_explore,
        // 'social-hub-events': ar_social_hub_events,
        // 'social-hub-groups': ar_social_hub_groups,
        // 'social-hub-messages': ar_social_hub_messages,
        // 'social-hub-profile': ar_social_hub_profile,
        // 'social-hub-profile-username': ar_social_hub_profile_username,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: [
      'page', 'admin', 'auth', 'blog', 'calculator', 'chatbot', 'dashboard', 'faq', 'food-scanner', 'form', 'forum', 'grocery-list', 'habits', 'plans', 'profile', 'recipes', 'settings', 'testimonials', 'tracker', 'notifications', 'notifications-dropdown', 'social-hub', 'social-hub-notifications', 'social-hub-leaderboard', 'social-hub-settings', 'social-hub-explore', 'social-hub-events', 'social-hub-groups', 'social-hub-messages', 'social-hub-profile', 'social-hub-profile-username', 'footer', 'navbar', 'sidebar'
    ],
    defaultNS: 'page',
    interpolation: { escapeValue: false },
  });

export default i18n;
