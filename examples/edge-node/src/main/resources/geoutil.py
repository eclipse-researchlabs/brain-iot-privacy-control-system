"""
Small version of geoutils.py developed by Davide Bonino on Nov 28, 2014

Original version partially adapted from:
PySatel - a Python framework for automated processing of scientific data acquired from spacecraft instruments.
Copyright (C) 2010 David Parunakian

This program is free software: you can redistribute it and/or modify it under the terms of the GNU
General Public License as published by the Free Software Foundation, either version 3 of the License,
or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

@authors: Dario Bonino
"""

from math import pow, degrees, radians
from numpy.lib import scimath
from numpy import sin, cos, mat, tan, arctan2
import sys

# Constants defined by the World Geodetic System 1984 (WGS84)
a = 6378137.0000
b = 6356752.3142
esq = 1 - pow((b / a), 2)  # 6.69437999014 * 0.001
e1sq = pow((scimath.sqrt(1 - pow((b / a), 2)) * (a / b)), 2)  # 6.73949674228 * 0.001
f = 1 / 298.257223563




def localxyz2geodetic(x, y, z, theta, origin_lat, origin_lon, origin_alt):
    """ Convert local xyz coordinates WGS84 geodetic coordinates. """
    x = float(x)
    y = float(y) 
    z = float(z)
    #print (""+str(x)+""+str(y)+""+str(z))
    x, y, z = localxyz2enu(x, y, z, theta)

    #print (""+str(x)+""+str(y)+""+str(z))
    x, y, z = enu2ecef(origin_lat, origin_lon, origin_alt, x, y, z)

    #print (""+str(x)+""+str(y)+""+str(z))
    x, y, z = ecef2geodetic(x, y, z)
    #print (""+str(x)+""+str(y)+""+str(z))

    lat = int(x)*100+(x - int(x))*60
    lon = int(y)*100+(y - int(y))*60
    print ("lat="+str(x))
    print ("lon="+str(y))
    print ("height="+str(z))
    return x, y, z


def localxyz2enu(x, y, z, theta):
    """ Convert local xyz coordinates in a cartesian plane rotated
        with respect to the north by theta degrees into an enu xyz set
        of coordinates.
    """
    theta = radians(theta)
    transform_matrix = mat('[%f %f; %f %f]' % (cos(theta), sin(theta), -sin(theta), cos(theta)))
    coordinate_matrix = mat('[%f;%f]' % (float(x), float(y)))
    transformed_matrix = transform_matrix * coordinate_matrix
    return float(transformed_matrix[0][0]), float(transformed_matrix[1][0]), z


def enu2ecef(lat, lon, alt, n, e, d):
    """ NED (north/east/down) to ECEF coordinate system conversion. """
    x, y, z = n, e, -d
    lat, lon = radians(lat), radians(lon)
    X, Y, Z = geodetic2ecef(lat, lon, alt)
    mx = mat('[%f %f %f; %f %f %f; %f %f %f]' %
             (-sin(lon), -sin(lat) * cos(lon), cos(lat) * cos(lon), cos(lon),
              -sin(lat) * sin(lon), cos(lat) * sin(lon), 0, cos(lat), sin(lat)))
    mxt = mx.transpose()
    enu = mat('[%f %f %f]' % (x, y, z))
    geo = mat('[%f %f %f]' % (X, Y, Z))
    res = enu * mxt + geo
    return float(res.getA()[0][0]), float(res.getA()[0][1]), float(res.getA()[0][2])


def ecef2geodetic(x, y, z):
    """ Convert ECEF coordinates to geodetic. According to
        J. Zhu, "Conversion of Earth-centered Earth-fixed coordinates \
        to geodetic coordinates," IEEE Transactions on Aerospace and \
        Electronic Systems, vol. 30, pp. 957-961, 1994.
    """
    r = scimath.sqrt(x * x + y * y)
    Esq = a * a - b * b
    F = 54 * b * b * z * z
    G = r * r + (1 - esq) * z * z - esq * Esq
    C = (esq * esq * F * r * r) / (pow(G, 3))
    S = cbrt(1 + C + scimath.sqrt(C * C + 2 * C))
    P = F / (3 * pow((S + 1 / S + 1), 2) * G * G)
    Q = scimath.sqrt(1 + 2 * esq * esq * P)
    r_0 = -(P * esq * r) / (1 + Q) + scimath.sqrt(0.5 * a * a * (1 + 1.0 / Q) - \
                                          P * (1 - esq) * z * z / (Q * (1 + Q)) - 0.5 * P * r * r)
    U = scimath.sqrt(pow((r - esq * r_0), 2) + z * z)
    V = scimath.sqrt(pow((r - esq * r_0), 2) + (1 - esq) * z * z)
    Z_0 = b * b * z / (a * V)
    h = U * (1 - ((b * b) / (a * V)))
    lat = arctan2((z + e1sq * Z_0), r)
    lon = arctan2(y, x)
    # print ("lat: %f lon:%f")%(lat,lon)
    return degrees(lat), degrees(lon), h


def geodetic2ecef(lat, lon, alt):
    """Convert geodetic coordinates to ECEF."""
    xi = scimath.sqrt(1 - esq * sin(lat) * sin(lat))
    # tmp = 1- pow(esq,2)
    tmpden = scimath.sqrt(1 + (1 - esq) * pow(tan(lat), 2))
    x = (a * cos(lon)) / tmpden + alt * cos(lon) * cos(lat)
    y = (a * sin(lon)) / tmpden + alt * sin(lon) * cos(lat)
    # x = (a / xi + alt) * cos(lat) * cos(lon)
    # y = (a / xi + alt) * cos(lat) * sin(lon)
    z = (a / xi * (1 - esq) + alt) * sin(lat)
    return x, y, z


def cbrt(x):
    """ cube root computation """
    if x >= 0:
        return pow(x, 1.0/3.0)
    else:
        return -pow(abs(x), 1.0/3.0)
		
if __name__ == '__main__':
    globals()[sys.argv[1]](sys.argv[2],float(sys.argv[3]),float(sys.argv[4]),float(sys.argv[5]),float(sys.argv[6]),float(sys.argv[7]),float(sys.argv[8]))
