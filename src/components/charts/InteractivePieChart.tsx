import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme, getCssVar } from '../../theme/ThemeContext';
import { ThemedText } from '../../components/common/ThemedView';

interface PieChartProps {
  data: Array<{
    value: number;
    svg: { fill: string };
    key: string;
  }>;
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  formatValue?: (value: number) => string;
}

export const InteractivePieChart: React.FC<PieChartProps> = ({
  data,
  width = 140,
  height = 140,
  innerRadius,
  outerRadius,
  formatValue = (value) => `${value.toLocaleString()} FCFA`,
}) => {
  const { colors, cssVar } = useTheme();
  const [selectedSlice, setSelectedSlice] = useState<any | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  const center = { x: width / 2, y: height / 2 };
  
  // Set the outer radius based on width and height
  const calculatedOuterRadius = outerRadius || Math.min(width, height) / 2 - 2;
  
  // Set the inner radius to 65% cutout (smaller than previous 70%)
  const calculatedInnerRadius = innerRadius || calculatedOuterRadius * 0.65;

  // Calculate total from values provided
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Animate pie chart on mount
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Create pie slices
  const createPieSlices = () => {
    let startAngle = 0;
    return data.map((item, index) => {
      // Calculate angles
      const angleValue = (item.value / total) * 360;
      const endAngle = startAngle + angleValue;
      
      // Calculate middle angle for tooltip positioning
      const midAngle = startAngle + angleValue / 2;
      const midAngleRad = (midAngle * Math.PI) / 180;
      
      // Calculate tooltip position
      const tooltipDistance = calculatedOuterRadius * 0.8;
      const tooltipX = center.x + tooltipDistance * Math.cos(midAngleRad);
      const tooltipY = center.y + tooltipDistance * Math.sin(midAngleRad);
      
      // Generate arc path
      const path = createArcPath(
        center.x,
        center.y,
        calculatedOuterRadius,
        startAngle,
        endAngle,
        calculatedInnerRadius
      );
      
      // Store current start angle before updating for next slice
      const currentStartAngle = startAngle;
      startAngle = endAngle;

      return {
        path,
        color: item.svg.fill,
        data: { label: item.key, value: item.value, color: item.svg.fill },
        tooltipPosition: { x: tooltipX, y: tooltipY },
        midAngle,
        startAngle: currentStartAngle,
        endAngle
      };
    });
  };

  // Create arc path for each slice with border radius
  const createArcPath = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    innerRadius: number
  ) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    // Calculate points
    const startX = x + radius * Math.cos(startAngleRad);
    const startY = y + radius * Math.sin(startAngleRad);
    const endX = x + radius * Math.cos(endAngleRad);
    const endY = y + radius * Math.sin(endAngleRad);

    const startX2 = x + innerRadius * Math.cos(endAngleRad);
    const startY2 = y + innerRadius * Math.sin(endAngleRad);
    const endX2 = x + innerRadius * Math.cos(startAngleRad);
    const endY2 = y + innerRadius * Math.sin(startAngleRad);

    // Create arc path
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    // Path for donut slice
    const outerArc = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
    const innerArc = `L ${startX2} ${startY2} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${endX2} ${endY2} Z`;
    
    return `${outerArc} ${innerArc}`;
  };

  // Handle slice touch
  const handleSlicePress = (slice: any) => {
    setSelectedSlice(slice.data);
    setTooltipPosition(slice.tooltipPosition);
  };

  // Clear tooltip on backdrop press
  const handleBackdropPress = () => {
    setSelectedSlice(null);
  };

  const slices = createPieSlices();
  const backgroundColor = cssVar['--card'];

  return (
    <GestureHandlerRootView style={styles.chartWrapper}>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.chartContainer}>
          <Animated.View
            style={{
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
              opacity: animatedValue,
            }}
          >
            <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
              {/* Background transparent */}
              <Circle
                cx={center.x}
                cy={center.y}
                r={calculatedOuterRadius}
                fill="transparent"
              />
              
              {/* Pie slices */}
              <G>
                {slices.map((slice, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => handleSlicePress(slice)}
                  >
                    <G>
                      <Path 
                        d={slice.path} 
                        fill={slice.color} 
                        strokeWidth="0"
                      />
                    </G>
                  </TouchableWithoutFeedback>
                ))}
              </G>
            </Svg>
          </Animated.View>
          
          {/* Tooltip */}
          {selectedSlice && (
            <View
              style={[
                styles.tooltip,
                {
                  position: 'absolute',
                  left: tooltipPosition.x - 75, // Half tooltip width for centering
                  top: tooltipPosition.y - 40,
                  backgroundColor: '#111827', // Dark background per specs
                }
              ]}
            >
              <ThemedText style={styles.tooltipTitle}>{selectedSlice.label}</ThemedText>
              <ThemedText style={styles.tooltipValue}>{formatValue(selectedSlice.value)}</ThemedText>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  chartWrapper: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 140,
    alignSelf: 'center',
  },
  chartContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltip: {
    padding: 8,
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  tooltipValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
}); 