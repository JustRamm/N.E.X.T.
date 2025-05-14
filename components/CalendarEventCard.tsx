import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, MapPin, Video } from 'lucide-react-native';
import Card from './Card';
import { CalendarEvent } from '@/types';
import colors from '@/constants/colors';

interface CalendarEventCardProps {
  event: CalendarEvent;
}

const CalendarEventCard: React.FC<CalendarEventCardProps> = ({ event }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/event-details',
      params: { id: event.id },
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>{formatDate(event.date)}</Text>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>
              {event.startTime} - {event.endTime}
            </Text>
          </View>
          
          {event.isOnline ? (
            <View style={styles.detailItem}>
              <Video size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>Online Meeting</Text>
            </View>
          ) : (
            <View style={styles.detailItem}>
              <MapPin size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>{event.location}</Text>
            </View>
          )}
        </View>
        
        {event.description && (
          <Text style={styles.description} numberOfLines={2}>
            {event.description}
          </Text>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 12,
  },
  details: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});

export default CalendarEventCard;